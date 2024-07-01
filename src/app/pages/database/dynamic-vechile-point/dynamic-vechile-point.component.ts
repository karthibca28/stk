import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-dynamic-vechile-point',
  templateUrl: './dynamic-vechile-point.component.html',
  styleUrls: ['./dynamic-vechile-point.component.scss']
})
export class DynamicVechilePointComponent implements OnInit {

  dynamaicDataForTable: any;
  pageSize: number = 10;
  pageNumber: number = 1

  constructor(private router: Router, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.secondaryService.getVehiclePoint(this.pageNumber, this.pageSize).subscribe((res: any) => {
        const data = res.data;
        const values = data.map((item: any) => ({
          ...item,
          name: item.createdBy.firstName
      }));
        const cols = [
          { field: 'name', header: 'Created By', type: 'text' },
          { field: 'locationName', header: 'Location Name', type: 'text' },
          { field: 'latitude', header: 'Latitude', type: 'text' },
          { field: 'longitude', header: 'Longitude', type: 'text' },
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

  viewRecord(vehiclePointId:any){
    this.router.navigate([`main/database/dynamic-vechile-form`,vehiclePointId])
  }

  openForm() {
    this.router.navigate(['/main/database/dynamic-vechile-form']);
}

}
