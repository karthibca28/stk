import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonFormData } from 'src/app/shared/models/json-form-data';

@Component({
  selector: 'app-explore-area',
  templateUrl: './explore-area.component.html',
  styleUrls: ['./explore-area.component.scss']
})
export class ExploreAreaComponent implements OnInit {
formData!: JsonFormData;
data=[];
selectedData:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.data = [
      {name: 'School', code: 'NY'},
      {name: 'Restaurant', code: 'RM'},
      {name: 'Hospitals', code: 'LDN'},
  ];
  }
  submit(event){

  }
  cancel() {
    this.router.navigate(['/main']);
  }
}
