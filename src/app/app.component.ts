import { Component } from '@angular/core';
import { ItemPedidoProps } from './components/item-pedido/item-pedido.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-angular';

  pedido1:  ItemPedidoProps = {
    produto: {
        id: 1,
        nome: 'Pizza de peito de peru',
        descricao: 'Queijo mussarela, peito de peru, etc',
        imagem: './assets/imagens/pizza1.jpg',
        //imagem: 'imagens/pizza1.jpg',
        preco: 75.65
    },
    quantidade: 4
  }

  pedido2 :  ItemPedidoProps = {
    produto: {
        id: 2,
        nome: 'Pizza de frango',
        descricao: 'Queijo mussarela, frango, etc',
        imagem: './assets/imagens/pizza2.jpg',
        //imagem: 'imagens/pizza2.jpg',
        preco: 60.00
    },
    quantidade: 1
  }

  pedido3 :  ItemPedidoProps = {
    produto: {
        id: 3,
        nome: 'Pizza de carne',
        descricao: 'Queijo mussarela, carne, etc',
        imagem: './assets/imagens/pizza3.jpg',
        //imagem: 'imagens/pizza3.jpg',
        preco: 64.18
    },
    quantidade: 1
  }

  pedido = {
    lista: [this.pedido1,this.pedido2,this.pedido3]
  }

}
