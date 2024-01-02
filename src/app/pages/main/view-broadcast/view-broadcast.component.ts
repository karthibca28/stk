import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'console';
import { Track } from 'ngx-audio-player';
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
  // mssapPlaylist: any;
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
    this.editMasterId = this.route.snapshot.params['broadcastId'];
    console.log(this.route.snapshot.params['broadcastId']);
    this.formService.getBroadCastById(this.editMasterId).subscribe((formData: any) => {
      this.broadCastData = formData.data;
      this.messageData = formData.data.message
      this.titleData = formData.data.title
      console.log(this.broadCastData);
      this.onAudio(this.broadCastData?.broadcastAttachment?.audio[0].downloadPath)
    });
  }
  // mssapPlaylist: Track[] = [
  //   {
  //     title: 'Audio Title',
  //     link: 'https://dev.vividtranstech.com/stk/api/v1/uploads/audio?fileNameId=clqes3jev002cqb2de6s255vt&authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6bnVsbCwidWlkIjoiY2xvZmJzZmd1MDAwNTlhMDlxamltb3c2aCIsInRpZCI6IjhhMzIyOTk1LTU1ZGYtNDJhYi1iZTIyLWQzMzBlZmQxYzdmNSIsInBzSWQiOiJjbG9lYnRvaWgwMWtsOWFsZ3hjenZjYjE4IiwidG9rZW5Vc2UiOiJhY2Nlc3MiLCJpYXQiOjE3MDMxMzkzNzgsImV4cCI6MTcwMzE3NTM3OH0.9QOmPQVjLriaDkl6VHkTCV4p5WwxvXYM10EMRJKbRCg',
  //     artist: 'Audio Artist',
  //     duration: 5
  //   }
  // ];
  async onAudio(data: any): Promise<void> {
    try {
      const res = await this.formService.getAudio(data);
      if (!res) {
        throw new Error('Invalid file response');
      }
      console.log(res)
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
      const res = await this.formService.getFileForBroadCast(data?.downloadPath);
      if (!res) {
        throw new Error('Invalid file response');
      }
  
      this.fileType = res.type;
      console.log(res.type);
      
      if (this.fileType == 'application/pdf') {
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
  
  
  viewAudio(data:any){

  }
  
}
