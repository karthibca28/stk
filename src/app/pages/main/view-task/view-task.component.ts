import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

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
        message: formData.message,

      });
    });
    
  }
  async viewImg(data: any, fileType: string): Promise<void> {
    try {
      const res = await this.formService.getImg(data);
      if (!res) {
        throw new Error('Invalid file response');
      }

      this.fileType = res.type
      console.log(res.type)
      const fileUrl = await this.getPdfUrl(res);
      this.fileUrl = fileUrl;
    } catch (e) {
      console.error('Error fetching or processing file:', e);
    }
  }

  async viewFiles(data: any, fileType: string): Promise<void> {
    try {
      const res = await this.formService.getFileForBroadCast(data);
      if (!res) {
        throw new Error('Invalid file response');
      }

      this.fileType = res.type
      console.log(res.type)
      const fileUrl = await this.getPdfUrl(res);
      this.fileUrl = fileUrl;
    } catch (e) {
      console.error('Error fetching or processing file:', e);
    }
  }

  getPdfUrl(e:Blob): SafeResourceUrl {
    const pdfUrl = URL.createObjectURL(e);
    console.log("Select files", pdfUrl)
    this.isFileLoaded = true;
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    if (this.fileUrl) {
    // const pdfBlob = new Blob(e, { type: 'application/pdf' });
  } else {
    // If fileUrl is not available, return an empty SafeResourceUrl
    return '';
  }
}


}