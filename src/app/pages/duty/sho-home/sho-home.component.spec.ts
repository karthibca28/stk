import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoHomeComponent } from './sho-home.component';

describe('ShoHomeComponent', () => {
  let component: ShoHomeComponent;
  let fixture: ComponentFixture<ShoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
