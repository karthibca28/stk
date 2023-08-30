import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMoreTableComponent } from './dynamic-more-table.component';

describe('DynamicMoreTableComponent', () => {
  let component: DynamicMoreTableComponent;
  let fixture: ComponentFixture<DynamicMoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicMoreTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicMoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
