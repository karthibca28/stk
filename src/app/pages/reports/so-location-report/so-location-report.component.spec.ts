import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoLocationReportComponent } from './so-location-report.component';

describe('SoLocationReportComponent', () => {
  let component: SoLocationReportComponent;
  let fixture: ComponentFixture<SoLocationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoLocationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoLocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
