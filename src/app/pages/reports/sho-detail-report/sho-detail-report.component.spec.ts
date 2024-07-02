import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoDetailReportComponent } from './sho-detail-report.component';

describe('ShoDetailReportComponent', () => {
  let component: ShoDetailReportComponent;
  let fixture: ComponentFixture<ShoDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoDetailReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
