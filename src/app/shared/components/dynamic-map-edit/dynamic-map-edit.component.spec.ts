import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMapEditComponent } from './dynamic-map-edit.component';

describe('DynamicMapEditComponent', () => {
  let component: DynamicMapEditComponent;
  let fixture: ComponentFixture<DynamicMapEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicMapEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMapEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
