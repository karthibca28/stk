import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-duty-point-list',
  templateUrl: './duty-point-list.component.html',
  styleUrls: ['./duty-point-list.component.scss']
})
export class DutyPointListComponent implements OnInit {
  dynamaicDataForTable: any;
  pageSize: number = 10;
  pageNumber: number = 1;

  constructor(private router: Router, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.secondaryService.getLocations(this.pageNumber, this.pageSize).subscribe((res: any) => {
        const data = res.data;
        const values = data.map((item: any) => ({
            ...item,
            policeStationName: item.policeStation.name
        }));
        const cols = [
            { field: 'policeStationName', header: 'Police Station', type: 'text' },
            { field: 'locationName', header: 'Location Name', type: 'text' },
            { field: 'latitude', header: 'Latitude', type: 'text' },
            { field: 'longitude', header: 'Longitude', type: 'text' },
        ];
        this.dynamaicDataForTable = { cols, values };
    });
}


  pagination(data: any) {
    this.pageSize = data.pageSize,
    this.pageNumber = data.pageNumber
    this.getList();
  }

  viewRecord(dutyPointId:any){
    this.router.navigate([`main/database/duty-point-form`,dutyPointId])
  }

  openForm() {
    this.router.navigate(['main/database/duty-point-form']);
}

}
