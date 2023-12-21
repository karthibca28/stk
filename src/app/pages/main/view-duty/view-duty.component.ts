import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-view-duty',
  templateUrl: './view-duty.component.html',
  styleUrls: ['./view-duty.component.scss']
})
export class ViewDutyComponent implements OnInit {

  editMasterId: any;
  dutyData: any;
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
      dutyType: ['', Validators.required],
      administrationName:[''],
      zoneName:[''],
      rangeName:[''],
      districtName:[''],
      subDivisionName:[''],
      policeStationName: [''],
      message:[''],
    });
    this.editMasterId = this.route.snapshot.params['dutyId'];
    console.log(this.route.snapshot.params['dutyId']);
    this.formService.getDutyById(this.editMasterId).subscribe((formData: any) => {
      this.dutyData = formData.data;
      this.messageData = formData.data.message
      this.titleData = formData.data.title
      this.form.patchValue({
        dutyType: formData.data.dutyType,
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
  async viewFiles(data: any, fileType: string): Promise<void> {
    try {
      const res = await this.formService.getFileForBroadCast(data);
      if (!res) {
        throw new Error('Invalid file response');
      }
  
      this.fileType = res.type;
      console.log(res.type);
      if (fileType == 'application/pdf') {
        this.downloadFile(res);
      } else {
        console.warn("data")
        const fileUrl = await this.getPdfUrl(res);
        this.fileUrl = fileUrl;
      }
    } catch (e) {
      console.error('Error fetching or processing file:', e);
    }
  }
  
  downloadFile(file: Blob): void {
    // Implement your download logic here
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(file);
    downloadLink.href = url;
    downloadLink.download = 'your_file_name.extension';
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
