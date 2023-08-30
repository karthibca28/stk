import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLocationComponent } from './approve-location.component';

describe('ApproveLocationComponent', () => {
  let component: ApproveLocationComponent;
  let fixture: ComponentFixture<ApproveLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
