import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesscontrolFormComponent } from './accesscontrol-form.component';

describe('AccesscontrolFormComponent', () => {
  let component: AccesscontrolFormComponent;
  let fixture: ComponentFixture<AccesscontrolFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesscontrolFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesscontrolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
