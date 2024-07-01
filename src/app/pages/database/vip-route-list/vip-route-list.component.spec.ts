import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipRouteListComponent } from './vip-route-list.component';

describe('VipRouteListComponent', () => {
  let component: VipRouteListComponent;
  let fixture: ComponentFixture<VipRouteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipRouteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipRouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
