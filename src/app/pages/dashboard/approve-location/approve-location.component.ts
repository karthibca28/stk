import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-approve-location',
  templateUrl: './approve-location.component.html',
  styleUrls: ['./approve-location.component.scss']
})
export class ApproveLocationComponent implements OnInit {
  showList: boolean = true;
  locationList: any[] = [];
  currentLocation: any;
  loading: boolean;
  searchHeader: any[] = ['name','locCategoryName','locSubcategoryName'];

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getLocatList();
  }
  getLocatList() {
    this.loading = true;
    const type = {"searchType": "approvalPending"};  
    this.formService.getLocationList(type).subscribe((resp: any) => {
      this.locationList = resp.data;
      this.loading = false;
    });
  }
  approveClick(passId) {
    const data = { "locationId": passId}
    this.formService.saveApproveLoc(data).subscribe((resp: APIResponse) => {
      if (resp.statusCode == 200) {
        this.sharedService.showSuccess(resp.message);
        setTimeout(() => {
          this.getLocatList();
        }, 800);
      } else {
        this.sharedService.showSuccess(resp.message);
      }
    }, (err: Error) => {
      this.sharedService.showError('Problem occurred, Please try again');
    })
  }
  rejectClick(passId) {
    const data = { "locationId": passId}
    this.formService.saveRejectLoc(data).subscribe((resp: APIResponse) => {
      if (resp.statusCode == 200) {
        this.sharedService.showSuccess(resp.message);
        setTimeout(() => {
          this.getLocatList();
        }, 800);
      } else {
        this.sharedService.showSuccess(resp.message);
      }
    }, (err: Error) => {
      this.sharedService.showError('Problem occurred, Please try again');
    })
  }
  editLocat(locId:number){
    this.router.navigateByUrl(`main/new-location/${locId}`);
  }
  apListClick() {
    this.router.navigate(['main/view-approve-location'])
  }
  backClick() {
    this.router.navigate(['main/'])
  }
}
