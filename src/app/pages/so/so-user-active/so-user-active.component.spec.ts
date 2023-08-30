import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoUserActiveComponent } from './so-user-active.component';

describe('SoUserActiveComponent', () => {
  let component: SoUserActiveComponent;
  let fixture: ComponentFixture<SoUserActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoUserActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoUserActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
