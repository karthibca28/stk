import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoDetailReportComponent } from './so-detail-report.component';

describe('SoDetailReportComponent', () => {
  let component: SoDetailReportComponent;
  let fixture: ComponentFixture<SoDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoDetailReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
