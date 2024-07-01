import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectiveSignalComponent } from './defective-signal.component';

describe('DefectiveSignalComponent', () => {
  let component: DefectiveSignalComponent;
  let fixture: ComponentFixture<DefectiveSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectiveSignalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectiveSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
