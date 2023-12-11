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
  selectedFiles: File[] = [];
  image:any
  file:any

  constructor(
    private formBuilder: FormBuilder,
    private masterService: MasterService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['inventoryTypeId'];
    console.log(this.editMasterId);
    this.form = this.formBuilder.group({
      inventoryType: [''],
      inventoryTypeCode: [''],
      description: [''],
      icon: ['']
    });
    const id = this.editMasterId;
    this.masterService.getInventoryTypeId(id).subscribe((resp: any) => {

      this.masterService.inventoryImg(resp.data.image.downloadPath).subscribe((imgRes: any) => {
        console.log('/>',imgRes)
      this.image = imgRes
      });
      this.form.patchValue({
        inventoryType: resp.data.inventoryType,
        inventoryTypeCode: resp.data.inventoryTypeCode,
        description: resp.data.description,
        // icon:URL.createObjectURL(this.image)
      });
      console.log(resp.data);
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.selectedFiles = [this.file];
    console.log(`File selected: ${this.file.name}`);
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
      const formData = new FormData();
      formData.append('inventoryType', this.form.value.inventoryType);
      formData.append('inventoryTypeCode', this.form.value.inventoryTypeCode);
      formData.append('description', this.form.value.description);
      formData.append('icon', this.selectedFiles[0]);  
      this.masterService.addInventoryType(formData).subscribe((data: any) => {
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
      const formData = this.constructFormData();

      this.masterService.updateInventoryType(formData).subscribe(
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

  private constructFormData(): FormData {
    const formData = new FormData();
    formData.append('id', this.editMasterId);
    formData.append('inventoryType', this.form.value.inventoryType);
    formData.append('inventoryTypeCode', this.form.value.inventoryTypeCode);
    formData.append('description', this.form.value.description);
    if (this.selectedFiles.length > 0) {
      formData.append('icon', this.selectedFiles[0]);
    }
    return formData;
  }

  cancel() {
    this.router.navigate(['main/master/inventorytype-list']);
  }
}
