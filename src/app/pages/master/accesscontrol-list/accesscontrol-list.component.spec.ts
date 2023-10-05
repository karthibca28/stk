import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesscontrolListComponent } from './accesscontrol-list.component';

describe('AccesscontrolListComponent', () => {
  let component: AccesscontrolListComponent;
  let fixture: ComponentFixture<AccesscontrolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesscontrolListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesscontrolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
