import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyPointsComponent } from './duty-points.component';

describe('DutyPointsComponent', () => {
  let component: DutyPointsComponent;
  let fixture: ComponentFixture<DutyPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
