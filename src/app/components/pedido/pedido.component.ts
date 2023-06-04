import { Component } from '@angular/core';
import { ItemPedidoComponent, ItemPedidoProps } from '../item-pedido/item-pedido.component';
import { SharedPedidoService } from '../shared-pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})

export class PedidoComponent {

  constructor(private sharedPedidoService: SharedPedidoService) {
    this.pedidoShared = sharedPedidoService.pedidoSharedValue;
  }

  pedidoShared: { lista: ItemPedidoProps[]; } = {lista:[]}

  handleQtdUpdate(produtoId: number, qtd: number): void {

    const indiceAlterado = this.sharedPedidoService.pedidoSharedValue.lista.findIndex(
      (elemento) => elemento.produto.id === produtoId
    );
    this.sharedPedidoService.pedidoSharedValue.lista[indiceAlterado].quantidade = parseInt(
      qtd.toString()
    );
    this.sharedPedidoService.pedidoSharedValue = {
      ...this.sharedPedidoService.pedidoSharedValue,
      lista: this.pedidoShared.lista
    };

    this.pedidoShared = this.sharedPedidoService.pedidoSharedValue;
  }

  handleClickLixeira(produtoId: number): void {
    this.sharedPedidoService.removerPedido(produtoId);
  }

}