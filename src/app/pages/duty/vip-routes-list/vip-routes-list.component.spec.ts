import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipRoutesListComponent } from './vip-routes-list.component';

describe('VipRoutesListComponent', () => {
  let component: VipRoutesListComponent;
  let fixture: ComponentFixture<VipRoutesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipRoutesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipRoutesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
