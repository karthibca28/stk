import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLivedataMapComponent } from './dynamic-livedata-map.component';

describe('DynamicLivedataMapComponent', () => {
  let component: DynamicLivedataMapComponent;
  let fixture: ComponentFixture<DynamicLivedataMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicLivedataMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicLivedataMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
