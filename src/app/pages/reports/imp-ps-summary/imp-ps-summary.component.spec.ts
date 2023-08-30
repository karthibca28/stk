import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpPsSummaryComponent } from './imp-ps-summary.component';

describe('ImpPsSummaryComponent', () => {
  let component: ImpPsSummaryComponent;
  let fixture: ComponentFixture<ImpPsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpPsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpPsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
