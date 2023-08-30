import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaDistReportComponent } from './da-dist-report.component';

describe('DaDistReportComponent', () => {
  let component: DaDistReportComponent;
  let fixture: ComponentFixture<DaDistReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaDistReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaDistReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
