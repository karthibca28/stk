import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMultipledataMapComponent } from './dynamic-multipledata-map.component';

describe('DynamicMultipledataMapComponent', () => {
  let component: DynamicMultipledataMapComponent;
  let fixture: ComponentFixture<DynamicMultipledataMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicMultipledataMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMultipledataMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
