import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicVechileFormComponent } from './dynamic-vechile-form.component';

describe('DynamicVechileFormComponent', () => {
  let component: DynamicVechileFormComponent;
  let fixture: ComponentFixture<DynamicVechileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicVechileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicVechileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
