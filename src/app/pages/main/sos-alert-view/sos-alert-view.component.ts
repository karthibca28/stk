import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-sos-alert-view',
  templateUrl: './sos-alert-view.component.html',
  styleUrls: ['./sos-alert-view.component.scss']
})
export class SosAlertViewComponent implements OnInit {
  form: FormGroup
  editMasterId: any
  sosAlert: any


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.initialForm();
    this.editMasterId = this.route.snapshot.params['sosAlertId'];
    this.getList();
  }

  initialForm(){
    this.form = this.fb.group({
      dutyType: [''],
      administrationName: [''],
      zoneName: [''],
      rangeName: [''],
      districtName: [''],
      subDivisionName: [''],
      policeStationName: [''],
      dutyStartDate: [''],
      dutyEndDate: [''],
      status: ['']
    })
  }

  getList(){
    this.secondaryService.getSosAlert(this.editMasterId).subscribe((res: any) => {
      this.sosAlert = res.data;
      console.log("reee", this.sosAlert)
    })
  }

}
