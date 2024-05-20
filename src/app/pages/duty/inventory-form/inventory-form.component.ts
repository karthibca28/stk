import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  form: FormGroup;
  type = [
    { id: "CAR", name: "CAR"},
    { id: "BARRICADES", name: "BARRICADES"},
    { id: "REFLECTIVE_JACKETS", name: "REFLECTIVE JACKETS"},
    { id: "COMPUTER", name: "COMPUTER"},
    { id: "TABLE_CHAIR", name: "TABLE CHAIR"},
    { id: "SERVER", name: "SERVER"},
    { id: "CCTV", name: "CCTV"},
    { id: "LIGHT_BATON", name: "LIGHT BATON"},
    { id: "WALKIETALKIE", name: "WALKIETALKIE"},
    { id: "CHALLAN_DEVICE", name: "CHALLAN DEVICE"},
    { id: "SIGNAL", name: "SIGNAL"}
  ]
  years = [
    { id: "2020", name: "2020"},
    { id: "2021", name: "2021"},
    { id: "2022", name: "2022"},
    { id: "2023", name: "2023"},
    { id: "2024", name: "2024"},
  ]
  count= [
    { id: "1", name: "1"},
    { id: "2", name: "2"},
    { id: "3", name: "3"},
    { id: "4", name: "4"},
    { id: "5", name: "5"},
    { id: "6", name: "6"},
    { id: "7", name: "7"},
  ]

  constructor(private fb: FormBuilder, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.initialInventory();
  }

  initialInventory(){
    this.form = this.fb.group({
      locationName: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      type: ['', Validators.required],
      itemName: ['', Validators.required],
      model: ['', Validators.required],
      description: ['', Validators.required],
      year: ['', Validators.required],
      count: ['', Validators.required],
      dateAdded: ['', Validators.required],
      amcProvider: ['', Validators.required],
      amcContact: ['', Validators.required],
      amcDetails: ['', Validators.required],
      amcCost: ['', Validators.required],
      amcStartDate: ['', Validators.required],
      amcEndDate: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.form.valid){
    var formData = new FormData();
    formData.append('locationName', this.form.value.locationName);
    formData.append('latitude', this.form.value.latitude);
    formData.append('longitude', this.form.value.longitude);
    formData.append('type', this.form.value.type);
    formData.append('itemName', this.form.value.itemName);
    formData.append('model', this.form.value.model);
    formData.append('description', this.form.value.description);
    formData.append('year', this.form.value.year);
    formData.append('count', this.form.value.count);
    var dateAdded = new Date(this.form.value.dateAdded).toISOString().split('T')[0];
    formData.append('dateAdded', dateAdded);
    formData.append('amcProvider', this.form.value.amcProvider);
    formData.append('amcContact', this.form.value.amcContact);
    formData.append('amcDetails', this.form.value.amcDetails);
    formData.append('amcCost', this.form.value.amcCost);
    var amcStartDate = new Date(this.form.value.amcStartDate).toISOString().split('T')[0];
    formData.append('amcStartDate', amcStartDate);
    var amcEndDate = new Date(this.form.value.amcEndDate).toISOString().split('T')[0];
    formData.append('amcEndDate', amcEndDate);
    this.secondaryService.addInventory(formData).subscribe((res: any) => {
      console.log("res", res)
    })
  } else {
    this.form.markAllAsTouched();
  }
  }

  location(data: any) {
    console.log(data)
    this.form.patchValue({
      latitude: data.latitude,  
      longitude:data.longitude
    })
  }

}
