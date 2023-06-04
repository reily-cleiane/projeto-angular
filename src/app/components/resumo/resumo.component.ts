import { Component,  EventEmitter, Output } from '@angular/core';
import { ItemPedidoProps } from '../item-pedido/item-pedido.component';
import { SharedPedidoService } from '../shared-pedido.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent {

  constructor(private sharedPedidoService: SharedPedidoService) {
    this.pedidoShared = sharedPedidoService.pedidoSharedValue;
  }

  @Output() fecharPedidoEvento = new EventEmitter<{valorTotal:number, valorItens:number, valorFrete:number, cep:string}>();

  pedidoShared: { lista: ItemPedidoProps[]; } = {lista:[]}

  private pedidoSubscription: Subscription = new Subscription;

  valorFrete = 0
  freteInvalido = true
  cep = ""
  qtdItens = 0
  valorItens = 0.0
  valorTotal = 0.0

  ngOnInit(): void {
    this.pedidoSubscription = this.sharedPedidoService.pedidoShared$.subscribe(
      (pedido) => {
        this.qtdItens = this.sharedPedidoService.pedidoSharedValue.lista.reduce(
          (total, item) => total + item.quantidade,
          0
        );

        this.valorItens = 0
        this.sharedPedidoService.pedidoSharedValue.lista.forEach( (item) => {
          this.valorItens+= item.quantidade*item.produto.preco
        });

        this.valorTotal = 0
        this.valorTotal = this.valorFrete+this.valorItens

      }
    );
  }

  handleCepUpdate(valor:number, validado:boolean, cepEnvio:string=""){
    if(validado){
      this.freteInvalido = false
      this.valorFrete = valor
      this.cep = cepEnvio
      this.valorTotal = this.valorFrete+this.valorItens
    }else{
      this.freteInvalido = true
      this.valorFrete = 0
      this.valorTotal = this.valorFrete+this.valorItens
      this.cep = ""
    }

  }

  ngOnDestroy(): void {
    this.pedidoSubscription.unsubscribe();
  }

}
