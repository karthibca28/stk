import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyPointFormComponent } from './duty-point-form.component';

describe('DutyPointFormComponent', () => {
  let component: DutyPointFormComponent;
  let fixture: ComponentFixture<DutyPointFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyPointFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyPointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
