import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipRoutesComponent } from './vip-routes.component';

describe('VipRoutesComponent', () => {
  let component: VipRoutesComponent;
  let fixture: ComponentFixture<VipRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
