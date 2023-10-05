import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorytypeListComponent } from './inventorytype-list.component';

describe('InventorytypeListComponent', () => {
  let component: InventorytypeListComponent;
  let fixture: ComponentFixture<InventorytypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorytypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorytypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
