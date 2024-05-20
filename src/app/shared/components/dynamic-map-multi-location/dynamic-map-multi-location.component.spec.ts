import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMapMultiLocationComponent } from './dynamic-map-multi-location.component';

describe('DynamicMapMultiLocationComponent', () => {
  let component: DynamicMapMultiLocationComponent;
  let fixture: ComponentFixture<DynamicMapMultiLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicMapMultiLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMapMultiLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
