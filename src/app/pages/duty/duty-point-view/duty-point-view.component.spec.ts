import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyPointViewComponent } from './duty-point-view.component';

describe('DutyPointViewComponent', () => {
  let component: DutyPointViewComponent;
  let fixture: ComponentFixture<DutyPointViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyPointViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyPointViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
