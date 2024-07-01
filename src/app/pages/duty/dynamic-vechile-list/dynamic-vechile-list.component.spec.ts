import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicVechileListComponent } from './dynamic-vechile-list.component';

describe('DynamicVechileListComponent', () => {
  let component: DynamicVechileListComponent;
  let fixture: ComponentFixture<DynamicVechileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicVechileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicVechileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
