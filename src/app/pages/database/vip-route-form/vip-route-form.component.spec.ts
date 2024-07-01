import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipRouteFormComponent } from './vip-route-form.component';

describe('VipRouteFormComponent', () => {
  let component: VipRouteFormComponent;
  let fixture: ComponentFixture<VipRouteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipRouteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VipRouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
