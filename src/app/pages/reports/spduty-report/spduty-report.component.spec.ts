import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpdutyReportComponent } from './spduty-report.component';

describe('SpdutyReportComponent', () => {
  let component: SpdutyReportComponent;
  let fixture: ComponentFixture<SpdutyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpdutyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpdutyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
