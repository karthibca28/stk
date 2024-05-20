import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SosAlertViewComponent } from './sos-alert-view.component';

describe('SosAlertViewComponent', () => {
  let component: SosAlertViewComponent;
  let fixture: ComponentFixture<SosAlertViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SosAlertViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SosAlertViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
