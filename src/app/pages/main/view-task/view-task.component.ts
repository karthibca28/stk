import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
renderCount:number=0;
  editMasterId: any;
  taskData: any;
  doc: SafeResourceUrl | undefined;
  fileUrl: SafeResourceUrl;
  fileType: string='application/pdf'
  isFileLoaded:boolean=false
  messageData:any
  titleData:any
  form!: FormGroup;
  attachmentData:any
  mssapPlaylist:Track[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private sharedService: SharedService,
    private formService: FormService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      taskType: ['', Validators.required],
      administrationName:[''],
      zoneName:[''],
      rangeName:[''],
      districtName:[''],
      subDivisionName:[''],
      policeStationName: [''],
      message:[''],
    });
    this.editMasterId = this.route.snapshot.params['taskId'];
    console.log(this.route.snapshot.params['taskId']);
    this.formService.getTaskById(this.editMasterId).subscribe((formData: any) => {
      this.taskData = formData.data;
      this.messageData = formData.data.message
      this.titleData = formData.data.title
      this.form.patchValue({
        taskType: formData.data.taskType,
        administrationName: formData.data.administrationName,
        zoneName: formData.data.zoneName,
        rangeName: formData.data.rangeName,
        districtName: formData.data.districtName,
        subDivisionName: formData.data.subDivisionName,
        policeStationName: formData.data.policeStationName,
        // message: formData.message,

      });
      this.onAudio(this.taskData?.attachment?.audio[0].downloadPath)
    });
    
  }
  async onAudio(data: any): Promise<void> {
    try {
      const res = await this.formService.getAudio(data);
      if (!res) {
        throw new Error('Invalid file response');
      }
      const audioFile : Track = {
        title: 'Audio Track',
        link: res,
      };
      console.log('res',res)
      this.mssapPlaylist.push(audioFile)
    } catch (e) {
      console.error('Error fetching or processing file:', e);
    }
  }
  async viewFiles(data: any, fileType: string): Promise<void> {
    console.log(data.fileName)
    try {
      const res = await this.formService.getFileForBroadCast(data.downloadPath);
      if (!res) {
        throw new Error('Invalid file response');
      }
  
      this.fileType = res.type;
      console.log(res.type);
      
      if (this.fileType === 'application/pdf') {
        console.warn("Displaying PDF");
        const fileUrl = await this.getPdfUrl(res);
        this.fileUrl = fileUrl;
      } else {
        console.warn("Downloading file directly");
        this.downloadFile(res, data.fileName);
      }
    } catch (e) {
      console.error('Error fetching or processing file:', e);
    }
  }
  
  downloadFile(file: Blob, fileName: string): void {
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(file);
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  
  getPdfUrl(e: Blob): SafeResourceUrl {
    const pdfUrl = URL.createObjectURL(e);
    console.log("Select files", pdfUrl);
    this.isFileLoaded = true;
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }
}
