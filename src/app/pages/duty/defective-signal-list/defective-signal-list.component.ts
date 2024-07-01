import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-defective-signal-list',
  templateUrl: './defective-signal-list.component.html',
  styleUrls: ['./defective-signal-list.component.scss']
})
export class DefectiveSignalListComponent implements OnInit {
  dynamaicDataForTable: any;

  constructor(private router: Router, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.secondaryService.getDefectiveSignal().subscribe((res: any) => {
      const values = res.data;
      const cols = [
        { field: 'policeStationName', header: 'Name', type: 'text' },
        { field: 'locationName', header: 'Location Name', type: 'text' },
        { field: 'latitude', header: 'Latitude', type: 'text' },
        { field: 'longitude', header: 'Logitude', type: 'text' },
        { field: 'description', header: 'End Location', type: 'text' },
      ];
      this.dynamaicDataForTable = { cols, values };
    });
  }

  openForm() {
    this.router.navigate(['/main/duty/defective-signal']);
  }
}
