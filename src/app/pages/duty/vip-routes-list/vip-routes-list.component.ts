import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-vip-routes-list',
  templateUrl: './vip-routes-list.component.html',
  styleUrls: ['./vip-routes-list.component.scss']
})
export class VipRoutesListComponent implements OnInit {

  dynamaicDataForTable: any;

  constructor(private router: Router, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.secondaryService.getVipRoute().subscribe((res: any) => {
      const values = res.data;
      const cols = [
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'type', header: 'Point Type', type: 'text' },
        { field: 'startLocationName', header: 'Start Location', type: 'text' },
        { field: 'endLocationName', header: 'End Location', type: 'text' },
      ];
      this.dynamaicDataForTable = { cols, values };
    });
  }

  openForm() {
    this.router.navigate(['/main/duty/vip-routes']);
  }
}
