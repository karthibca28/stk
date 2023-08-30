import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoUserInactiveComponent } from './so-user-inactive.component';

describe('SoUserInactiveComponent', () => {
  let component: SoUserInactiveComponent;
  let fixture: ComponentFixture<SoUserInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoUserInactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoUserInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
