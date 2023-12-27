import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { LoadingService } from 'src/app/shared/services/loading.service';
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
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['inventoryTypeId'];
    console.log(this.editMasterId);
    this.form = this.formBuilder.group({
      inventoryType: ['',Validators.required],
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
    this.loadingService.showLoader();
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
    this.loadingService.hideLoader();
        }
      });
    } else {
      this.form.markAllAsTouched();
    this.loadingService.hideLoader();
    }
    this.loadingService.hideLoader();
  }
  

  updateRecord() {
    this.loadingService.showLoader();
    if (this.form.valid) {
      this.loading = true;
      const formData = new FormData();
      formData.append('id', this.editMasterId);
      formData.append('inventoryType', this.form.value.inventoryType);
      formData.append('inventoryTypeCode', this.form.value.inventoryTypeCode);
      formData.append('description', this.form.value.description);

      this.masterService.updateInventoryType(formData).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/inventorytype-list`);
    this.loadingService.hideLoader();
        },
        (error) => {
          console.error('Error updating record:', error);
    this.loadingService.hideLoader();
        }
      );
    } else {
      this.form.markAllAsTouched();
    this.loadingService.hideLoader();
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
  filterSpecialCharacters(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  }
}
