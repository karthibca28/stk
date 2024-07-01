import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyPointsFormComponent } from './duty-points-form.component';

describe('DutyPointsFormComponent', () => {
  let component: DutyPointsFormComponent;
  let fixture: ComponentFixture<DutyPointsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyPointsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyPointsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
