import { Injectable } from '@angular/core';
import { ItemPedidoProps } from './item-pedido/item-pedido.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class SharedPedidoService {
  private pedidoShared = { lista: [] as ItemPedidoProps[] };
  private pedidoSharedSubject = new BehaviorSubject(this.pedidoShared);
  private pedidoRemovidoSubject = new Subject<number>();

  pedidoShared$ = this.pedidoSharedSubject.asObservable();
  pedidoRemovido$ = this.pedidoRemovidoSubject.asObservable();

  get pedidoSharedValue(): { lista: ItemPedidoProps[] } {
    return this.pedidoSharedSubject.getValue();
  }

  set pedidoSharedValue(pedido: { lista: ItemPedidoProps[] }) {
    this.pedidoShared = pedido;
    this.pedidoSharedSubject.next(pedido);
  }

  removerPedido(produtoId: number) {
    const indiceRemovido = this.pedidoShared.lista.findIndex(
      (elemento) => elemento.produto.id === produtoId
    );

    if (indiceRemovido !== -1) {
      this.pedidoShared.lista.splice(indiceRemovido, 1);
      this.pedidoSharedSubject.next(this.pedidoShared);
      this.pedidoRemovidoSubject.next(produtoId); // Emitir evento de remoção
    }
  }
  
}
