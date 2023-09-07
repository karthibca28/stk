import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlChecksComponent } from './dl-checks.component';

describe('DlChecksComponent', () => {
  let component: DlChecksComponent;
  let fixture: ComponentFixture<DlChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlChecksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
