import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoTaskComponent } from './so-task.component';

describe('SoTaskComponent', () => {
  let component: SoTaskComponent;
  let fixture: ComponentFixture<SoTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
