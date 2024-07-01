import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-duty-list',
  templateUrl: './duty-list.component.html',
  styleUrls: ['./duty-list.component.scss']
})
export class DutyListComponent implements OnInit {
  dynamaicDataForTable: any;
  pageSize: number = 10;;
  pageNumber: number = 1

  constructor(private router: Router, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.secondaryService.getDuty(this.pageNumber, this.pageSize).subscribe((res: any) => {
        const values = res.data;
        const cols = [
          { field: 'dutyType', header: 'Duty Type', type: 'text' },
          { field: 'name', header: 'Assigned To', type: 'text' },
          { field: 'startLocationName', header: 'Start Location', type: 'text' },
          { field: 'endLocationName', header: 'End Location', type: 'text' },
          { field: 'status', header: 'Status', type: 'text' },
        ];
        this.dynamaicDataForTable = {cols, values};
    });
  }

  pagination(data: any) {
    this.pageSize = data.pageSize,
    this.pageNumber = data.pageNumber
    this.getList();
  }

  viewRecord(dutyId:any){
    this.router.navigate([`main/duty/view-duty`,dutyId])
  }

  openForm() {
    this.router.navigate(['main/duty/view-duty']);
}

}
