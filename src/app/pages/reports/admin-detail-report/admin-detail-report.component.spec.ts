import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailReportComponent } from './admin-detail-report.component';

describe('AdminDetailReportComponent', () => {
  let component: AdminDetailReportComponent;
  let fixture: ComponentFixture<AdminDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDetailReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
