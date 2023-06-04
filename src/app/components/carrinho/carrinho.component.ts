import { Component,Input,OnInit } from '@angular/core';
import { SharedPedidoService } from '../shared-pedido.service';
import { ItemPedidoProps } from '../item-pedido/item-pedido.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  providers: [SharedPedidoService]
})

export class CarrinhoComponent implements OnInit{

  @Input() pedido!:{lista: ItemPedidoProps[]}
  qtdItens: number = 0;
  private pedidoSubscription: Subscription = new Subscription;
  private pedidoRemovidoSubscription: Subscription = new Subscription;

  constructor(private sharedPedidoService: SharedPedidoService) {
  }

  ngOnInit(): void {
    this.sharedPedidoService.pedidoSharedValue = this.pedido;
    this.qtdItens = this.sharedPedidoService.pedidoSharedValue.lista.reduce(
      (total, item) => total + item.quantidade,
      0
    );


    this.pedidoSubscription = this.sharedPedidoService.pedidoShared$.subscribe(
      (pedido) => {
        this.qtdItens = this.sharedPedidoService.pedidoSharedValue.lista.reduce(
          (total, item) => total + item.quantidade,
          0
        );
      }
    );

    this.pedidoRemovidoSubscription = this.sharedPedidoService.pedidoRemovido$.subscribe(
      (produtoId) => {
        const pedidoAtualizado = this.sharedPedidoService.pedidoSharedValue.lista;
        this.qtdItens = pedidoAtualizado.reduce(
          (total, item) => total + item.quantidade,
          0
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.pedidoSubscription.unsubscribe();
    this.pedidoRemovidoSubscription.unsubscribe();
  }
 
  handleFecharPedido(valorTotal: number, valorItens: number,valorFrete: number, cep: string) {
    let texto = 'Obrigada por comprar com a gente!\nNós enviaremos:\n';
    
    this.sharedPedidoService.pedidoSharedValue.lista.forEach(item => {
      texto += item.quantidade + ' ' + item.produto.nome + '\n';
    });
    
    texto +=
      'No valor total de R$ ' +
      valorTotal.toFixed(2) +
      ' (Itens = R$ ' +
      valorItens +
      ' + Frete = R$ ' +
      valorFrete +
      ')\nPara o cep: ' +
      cep;

    alert(texto);
  }
}
