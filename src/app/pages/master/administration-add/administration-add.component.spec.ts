import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationAddComponent } from './administration-add.component';

describe('AdministrationAddComponent', () => {
  let component: AdministrationAddComponent;
  let fixture: ComponentFixture<AdministrationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
