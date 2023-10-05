import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorytypeFormComponent } from './inventorytype-form.component';

describe('InventorytypeFormComponent', () => {
  let component: InventorytypeFormComponent;
  let fixture: ComponentFixture<InventorytypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorytypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorytypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
