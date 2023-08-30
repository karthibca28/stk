import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDivisionFormComponent } from './sub-division-form.component';

describe('SubDivisionFormComponent', () => {
  let component: SubDivisionFormComponent;
  let fixture: ComponentFixture<SubDivisionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDivisionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDivisionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
