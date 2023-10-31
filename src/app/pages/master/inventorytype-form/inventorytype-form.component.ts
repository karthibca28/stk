import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-inventorytype-form',
  templateUrl: './inventorytype-form.component.html',
  styleUrls: ['./inventorytype-form.component.scss']
})
export class InventorytypeFormComponent implements OnInit {
  public formData!: JsonFormData;
  form!: FormGroup;
  loading = false;
  editMasterId: any;
  
  constructor(private formBuilder: FormBuilder,private masterService:MasterService, private sharedService: SharedService,
    private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['inventoryTypeId'];
    console.log(this.editMasterId)
    this.form = this.formBuilder.group({
      inventoryType: [''],
      inventoryTypeCode: [''],
      description: ['']
    });
    const id=this.editMasterId
    this.masterService.getInventoryTypeId(id).subscribe((resp:any) => {
      this.form.patchValue({
        inventoryType: resp.data.inventoryType,
        inventoryTypeCode: resp.data.inventoryTypeCode,
        description: resp.data.description
      });
      console.log(resp.data)
    });
  }
  
  submit() {
    if (this.editMasterId === 0 || this.editMasterId === undefined || this.editMasterId === null) {
      this.addRecord();
    } else {
      this.updateRecord();
    }
  }

  addRecord() {

    if (this.form.valid) {
      this.loading = true;
      this.masterService.addInventoryType(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/inventorytype-list`);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  updateRecord() {
    if (this.form.valid) {
      this.loading = true;
      let value = {
        id :this.editMasterId,
        inventoryType:this.form.value.inventoryType,
        inventoryTypeCode:this.form.value.inventoryTypeCode,
        description:this.form.value.description
      }
      this.masterService.updateInventoryType(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/inventorytype-list`);
        },
        (error) => {
          console.error('Error updating record:', error);
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
  cancel() {
    this.router.navigate(['main/master/inventorytype-list'])
  }

}
