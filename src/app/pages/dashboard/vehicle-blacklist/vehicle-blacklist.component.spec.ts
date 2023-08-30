import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBlacklistComponent } from './vehicle-blacklist.component';

describe('VehicleBlacklistComponent', () => {
  let component: VehicleBlacklistComponent;
  let fixture: ComponentFixture<VehicleBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleBlacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
