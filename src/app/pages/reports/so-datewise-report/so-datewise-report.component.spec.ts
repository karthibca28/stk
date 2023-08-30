import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoDatewiseReportComponent } from './so-datewise-report.component';

describe('SoDatewiseReportComponent', () => {
  let component: SoDatewiseReportComponent;
  let fixture: ComponentFixture<SoDatewiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoDatewiseReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoDatewiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
