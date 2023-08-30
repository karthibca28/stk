import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DatePipe } from '@angular/common';
import { JsonFormData } from 'src/app/shared/models/json-form-data';

@Component({
  selector: 'app-broadcast-message',
  templateUrl: './broadcast-message.component.html',
  styleUrls: ['./broadcast-message.component.scss']
})
export class BroadcastMessageComponent implements OnInit {
  datePipe = new DatePipe('en-US');
  public formData!: JsonFormData;
  title: string = '';
  pv: boolean;
  isAdmin: boolean = false;
  isDAdmin: boolean = false;
  issofficer: boolean = false;
  isSHO: boolean = false;
  userData: any;
  
  constructor(private formService: FormService, private sharedService: SharedService, private router:Router){}
  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    if (this.userData.data.roleId === 1) {
      this.isAdmin = true;
    } else if(this.userData.data.roleId === 2) {
      this.isDAdmin = true;
    } else if(this.userData.data.roleId === 3) {
      this.issofficer = true;
    } else if(this.userData.data.roleId === 4) {
      this.isSHO = true;
    }

    this.buildForm();
  }
  
  buildForm() {
    const data = { formKey: 'broadcast-message' };
    this.formService.getDynamicFormData(data).subscribe((resp: any) => {
      this.formData = resp.data;
    });
  }
  submit(data: any) {
      const formData = new FormData();
      let broadcast = new BroadCast();
      broadcast.title = data.title;
      broadcast.content = data.content;
      broadcast.fromDate = this.datePipe.transform(data.fromDate, 'yyyy-MM-dd') as string;
      broadcast.toDate = this.datePipe.transform(data.toDate, 'yyyy-MM-dd') as string; 
       //console.log(this.formData.controls)
      // broadcast.voiceRecord = "";
      // delete broadcast.imageUpload;
      // delete broadcast.voiceRecord;
      //console.log(broadcast);
      formData.append('', JSON.stringify(broadcast));

      formData.append('title' ,broadcast.title);
      formData.append('content' ,broadcast.content);
      formData.append('fromDate' ,broadcast.fromDate);
      formData.append('toDate' ,broadcast.toDate);
      data['imageUpload[]'].forEach((f,index)=>{
        formData.append(`imageUpload[${index}]` , f.document);
      })
    
      // formData.append('imageUpload[]' ,JSON.stringify(data['imageUpload[]']));
      this.formService.addBroadcastSubmitFile(formData).subscribe((resp: APIResponse) => {
        if (resp.statusCode == 200) {
          this.sharedService.showSuccess(resp.message);
          setTimeout(() => {
            if (this.isSHO){
              this.router.navigate(['main/']);
            } else {
              this.router.navigate(['main/so']);
            }
          }, 800); 
        } else {
          this.sharedService.showError(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
  }
  cancel() {
    if (this.isAdmin || this.isDAdmin){
      this.router.navigate(['/main/admin']);
    } else if(this.issofficer){
      this.router.navigate(['/main/so']);
    } else if(this.isSHO){
      this.router.navigate(['/main']);
    }
  }
}

export class BroadCast {
  title: string;
  content: string;
  fromDate: string;
  toDate: string;
  imageUpload: DocumentDetail[] | string;
  voiceRecord: DocumentDetail | string;
}
export class DocumentDetail {
  fileName: string = '';
  document: any;
  documentId: number = 0;
  filePath: string = '';
}