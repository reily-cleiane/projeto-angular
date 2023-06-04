import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPedidoComponent } from './item-pedido.component';

describe('ItemPedidoComponent', () => {
  let component: ItemPedidoComponent;
  let fixture: ComponentFixture<ItemPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemPedidoComponent]
    });
    fixture = TestBed.createComponent(ItemPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
