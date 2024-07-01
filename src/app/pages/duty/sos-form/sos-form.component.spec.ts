import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOSFormComponent } from './sos-form.component';

describe('SOSFormComponent', () => {
  let component: SOSFormComponent;
  let fixture: ComponentFixture<SOSFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SOSFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SOSFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
