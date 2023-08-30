import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoBeatComponent } from './so-beat.component';

describe('SoBeatComponent', () => {
  let component: SoBeatComponent;
  let fixture: ComponentFixture<SoBeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoBeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoBeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
