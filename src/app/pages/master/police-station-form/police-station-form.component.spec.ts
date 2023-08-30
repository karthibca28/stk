import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceStationFormComponent } from './police-station-form.component';

describe('PoliceStationFormComponent', () => {
  let component: PoliceStationFormComponent;
  let fixture: ComponentFixture<PoliceStationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceStationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceStationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
