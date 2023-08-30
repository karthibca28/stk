import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSoComponent } from './report-so.component';

describe('ReportSoComponent', () => {
  let component: ReportSoComponent;
  let fixture: ComponentFixture<ReportSoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
