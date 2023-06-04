Deploy: https://projeto-angular-red.vercel.app/

Configurações iniciais

npm install -g @angular/cli
ng new meu-projeto


ng generate component components/produto

ng serve

Estilos

Interpolação e expressões com {{ }} frete html
Bind com [(ngModel)] item-pedido html , bind de atributo com [] produto.html e resumo html

Condicionais *ngIf em carrinho html

Loop *ngFor em pedido html

Passar dados do pai para o filho usando [] pedido html e @Input() item-pedido ts
Enviar eventos para o pai com @Output em item-pedido ts e pedido html, usando $event

Reatividade com alteração da variável por métodos

Compartilhar dados com toda a hierarquia
