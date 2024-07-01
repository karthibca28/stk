import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOSListComponent } from './sos-list.component';

describe('SOSListComponent', () => {
  let component: SOSListComponent;
  let fixture: ComponentFixture<SOSListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SOSListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SOSListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
