import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpdutySummaryComponent } from './spduty-summary.component';

describe('SpdutySummaryComponent', () => {
  let component: SpdutySummaryComponent;
  let fixture: ComponentFixture<SpdutySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpdutySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpdutySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
