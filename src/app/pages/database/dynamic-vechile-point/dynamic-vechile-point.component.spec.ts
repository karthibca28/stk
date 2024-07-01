import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicVechilePointComponent } from './dynamic-vechile-point.component';

describe('DynamicVechilePointComponent', () => {
  let component: DynamicVechilePointComponent;
  let fixture: ComponentFixture<DynamicVechilePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicVechilePointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicVechilePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
