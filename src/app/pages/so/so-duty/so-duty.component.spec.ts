import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoDutyComponent } from './so-duty.component';

describe('SoDutyComponent', () => {
  let component: SoDutyComponent;
  let fixture: ComponentFixture<SoDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoDutyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
