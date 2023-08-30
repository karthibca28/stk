import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceStationListComponent } from './police-station-list.component';

describe('PoliceStationListComponent', () => {
  let component: PoliceStationListComponent;
  let fixture: ComponentFixture<PoliceStationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceStationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
