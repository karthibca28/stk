import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  editMasterId:any
  broadCastData:any
  audio

 constructor(private router: Router, private formBuilder: FormBuilder, 
   private route: ActivatedRoute,private masterService: MasterService, private sharedService:SharedService,
   private formService: FormService,) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['broadcastId'];
    console.log(this.route.snapshot.params['broadcastId'])
    this.formService.getBroadCastById(this.editMasterId).subscribe((formData: any) => {
      this.broadCastData = formData.data
      this.audio = this.broadCastData.broadcastAttachment.audio
      console.log(this.broadCastData)
  })
  }

}
