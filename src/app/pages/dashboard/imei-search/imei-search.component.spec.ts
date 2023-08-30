import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImeiSearchComponent } from './imei-search.component';

describe('ImeiSearchComponent', () => {
  let component: ImeiSearchComponent;
  let fixture: ComponentFixture<ImeiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImeiSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImeiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
