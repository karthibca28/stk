import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMessageViewComponent } from './broadcast-message-view.component';

describe('BroadcastMessageViewComponent', () => {
  let component: BroadcastMessageViewComponent;
  let fixture: ComponentFixture<BroadcastMessageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastMessageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
