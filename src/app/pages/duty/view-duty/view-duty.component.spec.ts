import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDutyComponent } from './view-duty.component';

describe('ViewDutyComponent', () => {
  let component: ViewDutyComponent;
  let fixture: ComponentFixture<ViewDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDutyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
