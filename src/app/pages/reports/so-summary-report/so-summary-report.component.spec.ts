import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoSummaryReportComponent } from './so-summary-report.component';

describe('SoSummaryReportComponent', () => {
  let component: SoSummaryReportComponent;
  let fixture: ComponentFixture<SoSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
