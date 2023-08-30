import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeFormComponent } from './range-form.component';

describe('RangeFormComponent', () => {
  let component: RangeFormComponent;
  let fixture: ComponentFixture<RangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
