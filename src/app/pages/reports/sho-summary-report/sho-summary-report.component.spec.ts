import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoSummaryReportComponent } from './sho-summary-report.component';

describe('ShoSummaryReportComponent', () => {
  let component: ShoSummaryReportComponent;
  let fixture: ComponentFixture<ShoSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
