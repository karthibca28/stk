import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-sos-list',
  templateUrl: './sos-list.component.html',
  styleUrls: ['./sos-list.component.scss']
})
export class SOSListComponent implements OnInit {
  dynamaicDataForTable: any;
  pageSize: number = 10;
  pageNumber: number = 1

  constructor(private router: Router, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.secondaryService.getSOSAlert(this.pageNumber, this.pageSize).subscribe((res: any) => {
        const values = res.data;
        const cols = [
          { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
          { field: 'locationName', header: 'Location Name', type: 'text' },
          { field: 'latitude', header: 'Latitude', type: 'text' },
          { field: 'longitude', header: 'Longitude', type: 'text' },
        ];
        this.dynamaicDataForTable = {cols, values};
    });
  }

  openForm() {
    this.router.navigate(['/main/duty/sos-form']);
}

pagination(data: any) {
  this.pageSize = data.pageSize,
  this.pageNumber = data.pageNumber
  this.getList();
}

}
