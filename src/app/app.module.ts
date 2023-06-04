import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { ItemPedidoComponent } from './components/item-pedido/item-pedido.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { ResumoComponent } from './components/resumo/resumo.component';
import { FreteComponent } from './components/frete/frete.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent,
    ItemPedidoComponent,
    PedidoComponent,
    CarrinhoComponent,
    ResumoComponent,
    FreteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
