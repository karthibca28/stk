import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
//import { Dropdown } from 'primeng/dropdown';
import { DocumentDetail, JsonFormControls, JsonFormData } from '../../models/json-form-data';
import { FormService } from '../../services/form.service';
import { LoaderService } from '../../services/loader.service';
import { SharedService } from '../../services/shared.service';
//import Recorder from 'recorder-js';
//import { VideoRecordingService } from '../../services/video-recording.service';
import { AudioRecordingService } from '../../services/audio-recording.service';
//import { WebcamImage } from 'ngx-webcam';
//import { ImageCroppedEvent } from 'ngx-image-cropper';
//import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
//import { Result } from '@zxing/library';
import * as Tesseract from 'tesseract.js'

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// AfterViewInit
export class DynamicFormComponent implements OnInit, OnDestroy {

  @Input() jsonFormData!: JsonFormData;
  @Input() formValue: any;
  @Input() btnName: string = 'Submit';
  @Input() showCancelBtn: boolean = true;
  @Input() showResetBtn: boolean = true;
  @Output() emitCancel = new EventEmitter();
  @Output() emitSave = new EventEmitter();
  public myForm: FormGroup = this.fb.group({});
  documentDetail: any[] = [];
  display: string;
  clonedJsonFormData: JsonFormData;
  //@ViewChild('videoElement') videoElement: any;
  
  // Image capture
 // webcamImage: WebcamImage | undefined;
  currentControl: any;
  //isImageNotCaptured: boolean = true;
  numberPlate: Tesseract.Page;
  //ocrInprogress: boolean = false;
  en: { firstDayOfWeek: number; dayNames: string[]; dayNamesShort: string[]; dayNamesMin: string[]; monthNames: string[]; today: string; clear: string; };
  // handleImage(webcamImage: WebcamImage) {
  //   this.webcamImage = webcamImage;
  //   fetch(webcamImage.imageAsDataUrl)
  //     .then(res => res.blob()) 
  //     .then(blob => this.blob = blob);
  // }

  //camera capture
  // cameraModal:boolean = false;
  // camImage: WebcamImage | undefined;
  // camClickModal() {
  //   this.cameraModal = true;
  // }
  // cameraHandle(webcamImage: WebcamImage) {
  //   this.camImage = webcamImage;
  // }

  // cropper image
  // croppedImage: any = '';
  // blob;
  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = event.base64;
  // }
  // End Image capture

  //audio & video
  title: any;
  // captureModal: boolean;
  //videoModal: boolean;
  //video: any;
  // QRscan
  //QRModal: boolean;
  scanResult: any = '';
  public output: string;
  // @ViewChild('action', { static: true }) action: NgxScannerQrcodeComponent;
  // TODO something this.action
  public onError(e): void {
    alert(e);
  }

  isAudioRecording = false;
  //isVideoRecording = false;
  audioRecordedTime;
  //videoRecordedTime;
  audioBlobUrl;
  ////Url;
  audioBlob;
  //videoBlob;
  audioName;
  //videoName;
  //videoStream: MediaStream;
  //videoConf = { video: { facingMode: 'user', width: 320 }, audio: true };

  //Photo capture
  // WIDTH = 200;
  // HEIGHT = 200;
  // @ViewChild("videoForCapture")
  // public videoForCapture: ElementRef;
  // @ViewChild("canvas")
  // public canvas: ElementRef;
  // captures: string[] = [];
  // error: any;
  // isCaptured: boolean = false;

  //currentDevice: MediaDeviceInfo;
  //hasDevices: boolean;
  //hasPermission: boolean;
  //qrResult: Result;
  //scannerEnabled: boolean;

  constructor(private fb: FormBuilder, private sharedService: SharedService, private formService: FormService,
    private ref: ChangeDetectorRef, private sanitizer: DomSanitizer, private audioRecordingService: AudioRecordingService, private cdr: ChangeDetectorRef,
  ) {
    this.initaudioVideoRecord(); //private videoRecordingService: VideoRecordingService
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.jsonFormData.firstChange) {
      //console.log(this.jsonFormData);
      const userData = JSON.parse(sessionStorage.getItem('userInfo'));
      if ((this.jsonFormData.formHeader === 'Beat Form') && userData.data.roleId == 5) {
        this.jsonFormData.controls[1].value = this.jsonFormData.controls[1].value == '' ?? userData.data.userId;
        this.jsonFormData.controls[1].type = 'hidden';
      }
      if ((this.jsonFormData.formHeader === 'Court Duty' || this.jsonFormData.formHeader === 'Hospital Duty' ||
        this.jsonFormData.formHeader === 'Tappal Service' || this.jsonFormData.formHeader === 'Petition Enquiry' ||
        this.jsonFormData.formHeader === 'Summon / Warrant') && userData.data.roleId == 5) {
        this.jsonFormData.controls[0].value = userData.data.userId;
        this.jsonFormData.controls[0].type = 'hidden';
      }

      //       e: "Person Check", key: "Person Check",…},…]
      // 0: {id: "1", displayName: "Person Check", key: "Person Check",…}
      // 1: {id: "2", displayName: "Vehicle Check", key: "Vehicle Check",…}
      // 2: {id: "3", displayName: "Premises Check", key: "Premises Check",…}
      // 3: {id: "4", displayName: "Incident Report", key: "Incident Report",…}
      // 4: {id: "6", displayName: "Bad Character Check", key: "Bad Character Check",…}
      // 5: {id: "7", displayName: "Traffic Points", key: "Traffic Points",…}
      // 6: {id: "8", displayName: "IMEI Check", key: "IMEI Check",…}
      // 7: {id: "9", displayName: "Person & Vehicle Check", key: "Person & Vehicle Check",…}
      // 8: {id: "10", displayName: "Locked House", key: "Locked House",…}
      // 9: {id: "11", displayName: "Senior Citizens", key: "Senior Citizens",…}
      // 10: {id: "12", displayName: "Alerts",

      if ((this.jsonFormData.formHeader === 'Person Check'
      ) && userData.data.roleId == 5) {

        this.jsonFormData.controls[1].value = userData.data.userId;
        this.jsonFormData.controls[1].type = 'hidden';
      }
      if ((this.jsonFormData.formHeader === 'Vehicle Check' ||
        this.jsonFormData.formHeader === 'Premises Check' || this.jsonFormData.formHeader === 'Incident Report' ||
        this.jsonFormData.formHeader === 'Bad Character Check' ||
        this.jsonFormData.formHeader === 'Traffic Points' ||
        this.jsonFormData.formHeader === 'IMEI Check' ||
        this.jsonFormData.formHeader === 'Person & Vehicle Check' ||
        this.jsonFormData.formHeader === 'Locked House' ||
        this.jsonFormData.formHeader === 'Alerts' ||
        this.jsonFormData.formHeader === 'Unregistered Senior Citizen check'
      ) && userData.data.roleId == 5) {

        this.jsonFormData.controls[0].value = userData.data.userId;
        this.jsonFormData.controls[0].type = 'hidden';
      }
      this.clonedJsonFormData = this.sharedService.CloneArray(this.jsonFormData);
      this.clonedJsonFormData.controls = this.sharedService.CloneArray(this.jsonFormData.controls);
      this.createForm(this.jsonFormData.controls);
    }
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      today: 'Custom Today',
      clear: 'Clear it !!!'
    };
  }
  ngOnInit(): void {
    // setTimeout(() => {
    //   if (this.videoElement) {
    //     this.video = this.videoElement.nativeElement;
    //   }

    // }, 1000);
    this.display = "disabled";
  }

  createForm(controls: JsonFormControls[]) {
    controls = controls.sort((a, b) => a.displayOrder - b.displayOrder);
    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }
      if (!control.name.includes('Date') && control.value !== '') {
        if(control.type =="dropdown")  {
           this.myForm.addControl(control.name,this.fb.control(''));
           //this.myForm.get(control.name).setValue(this.jsonFormData.controls.find(data => data.name == control.name).valueOptions.find(data => data.id == control.value).id);
           this.myForm.get(control.name).setValue(+control.value);
         } else if(control.type ==="date" || control.type ==="datetime") {
           this.myForm.addControl(control.name, this.fb.control(new Date(control.value)));
         } else {
            this.myForm.addControl(control.name, this.fb.control(control.value));
         }
      } else if(control.type=="file") {
        this.myForm.addControl(control.name, this.fb.control(control.value==''?[]:control.value));
      } else {
        this.myForm.addControl(control.name, this.fb.control(control.value));
      }

    }
    setTimeout(() => {
      this.cdr.markForCheck();
    }, 500);

    // if (this.formValue) {
    //   this.myForm.patchValue(this.formValue);
    // }
    // this.myForm.controls.startDate.setValue(new Date('2022-12-12'))
    //console.log('Form: ', this.myForm);
  }
  openUploadDoc(event: any, control: JsonFormControls) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.target.files.length; i++) {
      const documentDetail = new DocumentDetail();
      documentDetail.fileName = event.target.files[i].name;
      documentDetail.document = event.target.files[i];
      documentDetail.documentId = 0;
      control.value = []; //remove this once api fixed
      if (
        control.value.filter(
          (x: any) => x.fileName === documentDetail.fileName
        ).length > 0
      ) {
        // this.sharedService.showMessage('File already exists', 'Ok');
      } else {
        control.value.push(documentDetail);
        let fa = this.myForm.controls[control.name] as FormArray;
        fa.setValue([]);
        fa.value.push(documentDetail);
      }
    }
  }

  openMultiUploadDoc(event: any, control: JsonFormControls) {
    // tslint:disable-next-line:prefer-for-of
    control.value = [];
    // fa.setValue([]);
    for (let i = 0; i < event.target.files.length; i++) {
      const documentDetail = new DocumentDetail();
      documentDetail.fileName = event.target.files[i].name;
      documentDetail.document = event.target.files[i];
      documentDetail.documentId = 0;
      // control.value = []; //remove this once api fixed
      // if (
      //   control.value.filter(
      //     (x: any) => x.fileName === documentDetail.fileName
      //   ).length > 0
      // ) {
      //   // this.sharedService.showMessage('File already exists', 'Ok');
      // } else {
        control.value.push(documentDetail);
        let fa = this.myForm.controls[control.name] as FormArray;
        // fa.setValue([]);
        
        fa.value.push(documentDetail);
      // }
    }
  }

  removeDocument(control: JsonFormControls, index: number) {
    control.value.splice(index, 1);
  }
  downloadDoc(data: any) {
    // this.sharedService.getDocByFilePath(data.filePath).subscribe((docByte) => {
    //   this.sharedService.downloadDocument('', docByte, data.fileName);
    // });
  }
  onDropdownChange(e: any, hasEvent: any[],type:string) {
    // console.log("dropdown value", e.value)
    if (hasEvent && hasEvent.length > 0) {
      hasEvent[0].requestData.inputValue = e.value;

      this.clonedJsonFormData.controls = this.sharedService.CloneArray(this.jsonFormData.controls);
      if(!hasEvent[0].evtAction){
        for (let index in this.myForm.controls) {
          if (index !== 'beatTypeId' && index !== 'userId' && index !== 'serviceTypeId'
            && index !== 'startDate' && index !== 'endDate' && index !== 'startTime' && index !== 'endTime') {
            this.myForm.removeControl(index);
          }
        }
      }

      this.formService.callDynamicFunction(hasEvent[0].callFun, hasEvent[0].requestData).subscribe((resp: any) => {
        if(hasEvent[0].evtAction && type=='dropdown'){
        const index = this.clonedJsonFormData.controls.findIndex(f=>f.name==hasEvent[0].evtAction);
          this.clonedJsonFormData.controls[index].valueOptions = resp.data;
        } else {
          resp.data.controls.forEach(f => {
            this.clonedJsonFormData.controls.push(f);
          });
          this.createForm(resp.data.controls);
          document.querySelectorAll('input,radioBtn').forEach(function (element: any) {
            if (element === document.activeElement) {
              return element.blur();
            }
          });
        }
      })
    }

  }
  addMore(control: any) {
    this.myForm.addControl(control.name + '1', this.fb.control(control.value));
  }
  initaudioVideoRecord() {
    // this.videoRecordingService.recordingFailed().subscribe(() => {
    //   this.// = false;
    //   this.ref.detectChanges();
    // });
    // this.videoRecordingService.getRecordedTime().subscribe((time) => {
    //   this.// = time;
    //   this.ref.detectChanges();
    // });
    // this.videoRecordingService.getStream().subscribe((stream) => {
    //   this.videoStream = stream;
    //   this.ref.detectChanges();
    // });
    // this.videoRecordingService.getRecordedBlob().subscribe((data) => {
    //   this.// = data.blob;
    //   this.// = data.title;
    //   this.// = this.sanitizer.bypassSecurityTrustUrl(data.url);
    //   this.ref.detectChanges();
    // });

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
    });
    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.audioRecordedTime = time;
      this.ref.detectChanges();
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.emitSave.emit(this.myForm.value);
    } else {
      this.myForm.markAllAsTouched();
    }
    // console.log('Form valid: ', this.myForm.valid);
    // console.log('Form values: ', this.myForm.value);
  }

  // async ngAfterViewInit() {
  //   await this.setupDevices();
  // }
  cancel() {
    this.emitCancel.emit();
  }
  reset() {
    this.myForm.reset();
  }
  /////audio  and viedo field methods/////
  // startVideoRecording() {
  //   if (!this.//) {
  //     this.video.controls = false;
  //     this.// = true;
  //     this.videoRecordingService
  //       .startRecording(this.videoConf)
  //       .then((stream) => {
  //         // this.video.src = window.URL.createObjectURL(stream);
  //         this.video.srcObject = stream;
  //         this.video.play();
  //       })
  //       .catch(function (err) {
  //         //console.log(err.name + ': ' + err.message);
  //       });
  //   }
  // }
  // abortVideoRecording() {
  //   if (this.//) {
  //     this.// = false;
  //     this.videoRecordingService.abortRecording();
  //     this.video.controls = false;
  //   }
  // }
  // stopVideoRecording() {
  //   if (this.//) {
  //     this.videoRecordingService.stopRecording();
  //     this.video.srcObject = this.//;
  //     this.// = false;
  //     this.video.controls = true;
  //   }
  // }
  // clearVideoRecordedData() {
  //   this.// = null;
  //   this.video.srcObject = null;
  //   this.video.controls = false;
  //   this.ref.detectChanges();
  // }

  startAudioRecording() {
    if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortAudioRecording() {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }
  // bindQrData(event: any) {
  //   this.output = event;
  //   const data = JSON.parse(event);
  //   this.myForm.controls['name'].setValue(data.name);
  //   this.myForm.controls['fatherName'].setValue(data.fathername);
  //   this.myForm.controls['idCardNo'].setValue(data.dlno);
  //   this.QRModal = false;
  // }

  stopAudioRecording(control: any) {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
      this.audioRecordingService.getRecordedBlob().subscribe((data) => {
        this.audioBlob = data.blob;
        this.audioName = data.title;
        this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(data.blob)
        );
        var file = new File([this.audioBlob], "name.mp3", { type: 'audio/mpeg' });
        const documentDetail = new DocumentDetail();
        documentDetail.fileName = file.name;
        documentDetail.document = file;
        documentDetail.documentId = 0;
        this.myForm.controls[control.name].setValue(documentDetail);
        //console.log(file)
        this.ref.detectChanges();
      });
    }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
  }


  //async setupDevices() {
    //if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // try {
      //   const stream = await navigator.mediaDevices.getUserMedia({
      //     video: true
      //   });
      //   if (stream) {
      //     this.videoForCapture.nativeElement.srcObject = stream;
      //     this.videoForCapture.nativeElement.play();
      //     this.error = null;
      //   } else {
      //     this.error = "You have no output video device";
      //   }
      // } catch (e) {
      //   this.error = e;
      // }
   // }
  //}
  
  // captureSnap(control: any) {
  //   this.currentControl = control;
  //   this.title = "OCR Capture";
  //   this.captureModal = true;
  //   this.isImageNotCaptured = false;
  // }
  // videoSnap() {
  //   this.title = "Video Capture";
  //   this.// = true;
  // }
  // capture() {
  //   this.drawImageToCanvas(this.videoForCapture.nativeElement);
  //   this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  //   this.isCaptured = true;
  // }
  // clearCapturedImage() {
  //   this.captures = [];
  // }
  // QRCapture() {
  //   this.title = "QR Capture";
  //   this.QRModal = true;
  // }
  // onQRData(result: string) {
  //   this.scanResult = result;
  // }
  // removeCurrent() {
  //   this.isCaptured = false;
  // }
  // setPhoto(idx: number) {
  //   this.isCaptured = true;
  //   var image = new Image();
  //   image.src = this.captures[idx];
  //   this.drawImageToCanvas(image);
  // }
  // drawImageToCanvas(image: any) {
  //   this.canvas.nativeElement
  //     .getContext("2d")
  //     .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  // }

  ngOnDestroy(): void {
    this.abortAudioRecording();
    //this.abortVideoRecording();
    this.myForm.reset();
  }
  //submitOcr() {
    //this.ocrInprogress = true;
    //Tesseract.recognize(this.croppedImage)
      //.then(p => {
        //console.log('progress....', p)
        // this.numberPlate = p.data;
        // this.ocrInprogress = false;
        // this.myForm.controls[this.currentControl.name].setValue(p.data.lines[0].text);
        // if (this.jsonFormData.formHeader == 'Person Check') {
        //   if (this.currentControl.name == 'idNo') {
        //     this.myForm.controls[this.currentControl.name].setValue(p.data.lines[0].text);
        //   } else {
        //     this.myForm.controls[this.currentControl.name].setValue(p.data.lines[1].text);
        //   }
        // } else if (this.jsonFormData.formHeader == 'Vehicle Check') {
        //   if (p.data.lines[1]) {
        //     this.myForm.controls[this.currentControl.name].setValue(p.data.lines[1].text);
        //   } else {
        //     this.myForm.controls[this.currentControl.name].setValue(p.data.lines[0].text);
        //   }
        // }
      //   this.isImageNotCaptured = false;
      //   this.cdr.markForCheck();
      // }, err => {
      //   this.ocrInprogress = false;
      // })
      // .catch(err => {
      //   this.ocrInprogress = false;
      //   this.sharedService.showError('Unable to read text');
        //console.error(err)
      //});
    //this.captureModal = false;
  //}
  // cancelOcr() {
  //   this.captureModal = false;
  // }
  setLatLong() {
    this.sharedService.getPosition().then(pos => {
      //  console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.myForm.controls['lat'].setValue(pos.lng);
      this.myForm.controls['lng'].setValue(pos.lat);
      this.myForm.controls['lat'].markAsTouched();
      this.myForm.updateValueAndValidity();
      setTimeout(() => {
        this.cdr.markForCheck();
      });
    });

  }
} 