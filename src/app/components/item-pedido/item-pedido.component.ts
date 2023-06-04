import { Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { ProdutoProps } from '../produto/produto.component';

export interface ItemPedidoProps {
  produto: ProdutoProps;
  quantidade: number;
}

@Component({
  selector: 'app-item-pedido',
  templateUrl: './item-pedido.component.html',
  styleUrls: ['./item-pedido.component.css']
})
export class ItemPedidoComponent implements OnInit{

  @Input() itemPedidoProps!: ItemPedidoProps;

  ngOnInit(): void {
    this.calcularTotalItem();
  }
  
  @Output() qtdUpdateEvento = new EventEmitter<{id: number, valor:number}>();
  @Output() clickLixieraEvento = new EventEmitter<any>();

  totalItem: number = 0

  validarQuantidade(evento: any): void {
    let quantidade = parseInt(evento.target.value);

    if (quantidade <= 0 || evento.target.value.trim().length === 0) {
      evento.target.value = 1;
      quantidade = 1;
      this.itemPedidoProps.quantidade = 1     
    }

    this.calcularTotalItem();

    const eventoObj = {
      id: this.itemPedidoProps.produto.id,
      valor: parseInt(evento.target.value)
    };

    this.qtdUpdateEvento.emit(eventoObj);

  }

  clickLixiera(id: number): void {
    this.clickLixieraEvento.emit(id);
  }

  calcularTotalItem(): void {
    this.totalItem = (this.itemPedidoProps.quantidade * this.itemPedidoProps.produto.preco);
  }

}
