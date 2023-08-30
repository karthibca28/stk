import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoActivitysummaryReportComponent } from './so-activitysummary-report.component';

describe('SoActivitysummaryReportComponent', () => {
  let component: SoActivitysummaryReportComponent;
  let fixture: ComponentFixture<SoActivitysummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoActivitysummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoActivitysummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
