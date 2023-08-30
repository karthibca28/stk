import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpDistrictSummaryComponent } from './imp-district-summary.component';

describe('ImpDistrictSummaryComponent', () => {
  let component: ImpDistrictSummaryComponent;
  let fixture: ComponentFixture<ImpDistrictSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpDistrictSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpDistrictSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
