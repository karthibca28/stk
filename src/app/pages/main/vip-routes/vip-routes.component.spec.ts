import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VIPRoutesComponent } from './vip-routes.component';

describe('VIPRoutesComponent', () => {
  let component: VIPRoutesComponent;
  let fixture: ComponentFixture<VIPRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VIPRoutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VIPRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
