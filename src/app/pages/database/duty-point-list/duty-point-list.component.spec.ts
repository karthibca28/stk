import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyPointListComponent } from './duty-point-list.component';

describe('DutyPointListComponent', () => {
  let component: DutyPointListComponent;
  let fixture: ComponentFixture<DutyPointListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyPointListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyPointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
