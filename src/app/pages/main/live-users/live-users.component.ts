import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-live-users',
  templateUrl: './live-users.component.html',
  styleUrls: ['./live-users.component.scss']
})
export class LiveUsersComponent implements OnInit {
  mapData: any[] = [];
  constructor(private masterService: MasterService,private loadingService: LoadingService,) { }

  ngOnInit(): void {
    this.getLiveUser()
  }
  getLiveUser() {
    this.loadingService.showLoader();
    this.masterService.liveUsers().subscribe((resp: any) => {
      this.mapData = resp.data
      console.log(this.mapData)
    });
    this.loadingService.hideLoader();
  }

}
