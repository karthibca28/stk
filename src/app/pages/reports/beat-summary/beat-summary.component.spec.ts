import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatSummaryComponent } from './beat-summary.component';

describe('BeatSummaryComponent', () => {
  let component: BeatSummaryComponent;
  let fixture: ComponentFixture<BeatSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
