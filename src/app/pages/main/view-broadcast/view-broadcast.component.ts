import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-view-broadcast',
  templateUrl: './view-broadcast.component.html',
  styleUrls: ['./view-broadcast.component.scss']
})
export class ViewBroadcastComponent implements OnInit {
  editMasterId: any;
  broadCastData: any;
  doc: SafeResourceUrl | undefined;
  fileUrl: SafeResourceUrl;
  fileType: string='application/pdf'
  isFileLoaded:boolean=false
  messageData:any
  titleData:any

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
    this.editMasterId = this.route.snapshot.params['broadcastId'];
    console.log(this.route.snapshot.params['broadcastId']);
    this.formService.getBroadCastById(this.editMasterId).subscribe((formData: any) => {
      this.broadCastData = formData.data;
      this.messageData = formData.data.message
      this.titleData = formData.data.title
      console.log(this.broadCastData);
    });
  }
  async viewImg(data: any, fileType: string): Promise<void> {
    try {
      const res = await this.formService.getImgForBroadCast(data);
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
