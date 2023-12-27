import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-live-users',
  templateUrl: './live-users.component.html',
  styleUrls: ['./live-users.component.scss']
})
export class LiveUsersComponent implements OnInit {
  mapData: any[] = [];
  constructor(private masterService: MasterService,) { }

  ngOnInit(): void {
    this.getLiveUser()
  }
  getLiveUser() {
    this.masterService.liveUsers().subscribe((resp: any) => {
      this.mapData = resp.data
      console.log(this.mapData)
    });
  }

}
