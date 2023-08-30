import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleBlacklistComponent } from './add-vehicle-blacklist.component';

describe('AddVehicleBlacklistComponent', () => {
  let component: AddVehicleBlacklistComponent;
  let fixture: ComponentFixture<AddVehicleBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVehicleBlacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
