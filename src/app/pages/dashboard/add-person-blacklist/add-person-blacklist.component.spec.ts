import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonBlacklistComponent } from './add-person-blacklist.component';

describe('AddPersonBlacklistComponent', () => {
  let component: AddPersonBlacklistComponent;
  let fixture: ComponentFixture<AddPersonBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonBlacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
