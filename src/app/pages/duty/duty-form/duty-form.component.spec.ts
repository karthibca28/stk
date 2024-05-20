import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyFormComponent } from './duty-form.component';

describe('DutyFormComponent', () => {
  let component: DutyFormComponent;
  let fixture: ComponentFixture<DutyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
