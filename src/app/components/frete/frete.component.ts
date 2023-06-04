import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-frete',
  templateUrl: './frete.component.html',
  styleUrls: ['./frete.component.css']
})

export class FreteComponent {

  freteCalculado = 0
  msgErro = ""
  cepValidado = false
  cidade = ""
  cep = ""
  @Output() cepUpdateEvento = new EventEmitter<any>();

  validarCEP(evento:any){

    this.cidade= ""
    this.cepValidado = false
    this.cepUpdateEvento.emit({valor:0, validado:false, cepEnvio:""});

    let cepLocal: any = evento.target.value.trim()
    cepLocal = cepLocal.replace("-","")

    if(isNaN(cepLocal)){
      this.msgErro = "Formato de CEP inválido"
      this.cidade= ""
      this.cepValidado = false
      this.cepUpdateEvento.emit({valor:0, validado:false, cepEnvio:""});     
      return
    }else{
      this.msgErro = ""
    }

    if(cepLocal.length<5){
      return
    }

    if(cepLocal.length>=6){
      let formatado = cepLocal.slice(0, 5) + "-" + cepLocal.slice(5);
      this.cep = formatado
    }
  }

  async consultarCEP() {
    console.log("Está consultando")

    let cepLocal: any = this.cep.trim()
    cepLocal = cepLocal.replace("-","")
    if(cepLocal.length==8){
      if(isNaN(cepLocal)){

        this.msgErro = "Formato de CEP inválido"
        this.cepValidado =false
        this.cepUpdateEvento.emit({valor:0, validado:false, cepEnvio:""});       
        this.cidade = ""
        return
      }else{
        this.msgErro = ""
      }

      let api: string
      api = "https://viacep.com.br/ws/"+cepLocal+"/json/"
      let response = await fetch(api)
      let json = await response.json();

      if(json.uf != null){
        this.msgErro = ""
        this.cidade = json.localidade+"-"+json.uf
        this.calcularFrete(json.uf)
        this.cepValidado =true
        this.cepUpdateEvento.emit({valor:this.freteCalculado, validado:true, cepEnvio:cepLocal}); 

      } else{
        this.msgErro = "CEP não encontrado"
        this.cepValidado =false
        this.cepUpdateEvento.emit({valor:0, validado:false, cepEnvio:""}); 
        this.cidade = ""
      }            
    }else{

      this.msgErro = "Formato de CEP inválido"
      this.cepValidado =false
      this.cepUpdateEvento.emit({valor:0, validado:false, cepEnvio:""}); 
      this.cidade=""
    }
  }

  calcularFrete(estado: string){

    switch (estado){
      case 'RN': 
      case 'PB':
      case 'CE': 
        this.freteCalculado = 0
        break
      case 'PI':
      case 'MA':
      case 'BA':
      case 'SE':
      case 'AL':
      case 'PE': 
        this.freteCalculado = 10
        break
      case 'TO':
      case 'PA':
      case 'AP':
      case 'AM':
      case 'RR':
      case 'RO':
      case 'AC':
        this.freteCalculado = 15
        break
      default: this.freteCalculado = 300
    }

  }

}
