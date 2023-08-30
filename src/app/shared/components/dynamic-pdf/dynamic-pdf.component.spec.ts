import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPdfComponent } from './dynamic-pdf.component';

describe('DynamicPdfComponent', () => {
  let component: DynamicPdfComponent;
  let fixture: ComponentFixture<DynamicPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
