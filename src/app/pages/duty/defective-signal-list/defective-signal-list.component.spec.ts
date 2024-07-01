import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectiveSignalListComponent } from './defective-signal-list.component';

describe('DefectiveSignalListComponent', () => {
  let component: DefectiveSignalListComponent;
  let fixture: ComponentFixture<DefectiveSignalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectiveSignalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectiveSignalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
