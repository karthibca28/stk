import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoUserComponent } from './so-user.component';

describe('SoUserComponent', () => {
  let component: SoUserComponent;
  let fixture: ComponentFixture<SoUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
