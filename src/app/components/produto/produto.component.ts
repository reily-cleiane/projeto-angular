import { Component, Input } from '@angular/core';

export interface ProdutoProps {
  id: number;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
}

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})

export class ProdutoComponent {
  //é necessário usar o ! para indicar que com certeza o componente receberá esse valor
  @Input() produtoProps!: ProdutoProps;
}