import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreAreaComponent } from './explore-area.component';

describe('ExploreAreaComponent', () => {
  let component: ExploreAreaComponent;
  let fixture: ComponentFixture<ExploreAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
