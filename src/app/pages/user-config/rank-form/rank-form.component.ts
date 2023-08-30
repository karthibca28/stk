import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-rank-form',
  templateUrl: './rank-form.component.html',
  styleUrls: ['./rank-form.component.scss']
})
export class RankFormComponent implements OnInit {

  public formData!: JsonFormData;

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
     this.sharedService.getDynamicFormData().subscribe((formData: any) => {
        this.formData = formData.rank;
      });
  }
  submit(formValue: any) {
    // this.formService.saveRankForm(formValue).subscribe((resp: APIResponse) => {
    //   if (resp.statusCode == 200) {
    //     // this.currentBeatId = resp.data.beatId;
    //     this.sharedService.showSuccess(resp.message);
    //     // setTimeout(() => {
          
    //     // }, 800);
    //   } else {
    //     this.sharedService.showSuccess(resp.message);
    //   }
    // }, (err: Error) => {
    //   this.sharedService.showError('Problem occurred, Please try again');
    // })
  }
  cancel() {
    this.router.navigate(['main/user-config/rank-list'])
  }


}
