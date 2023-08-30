import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpStateSummaryComponent } from './imp-state-summary.component';

describe('ImpStateSummaryComponent', () => {
  let component: ImpStateSummaryComponent;
  let fixture: ComponentFixture<ImpStateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpStateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpStateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
