import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoLocationComponent } from './so-location.component';

describe('SoLocationComponent', () => {
  let component: SoLocationComponent;
  let fixture: ComponentFixture<SoLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
