var Calculadora = {
  v_teclas: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "on", "sign", "dividido", "por", "menos", "punto", "igual", "mas"],
  self:"",
  init: function(){
     self = this;
     this.resetear();
     this.asignarEventoClickTeclas();
  },
  resetear:function () {
    sessionStorage.setItem('num1',0);
    sessionStorage.setItem('num2',0);
    sessionStorage.setItem('largo_num1',0);
    sessionStorage.setItem('largo_num2',0);
    sessionStorage.setItem('oper',false);
    sessionStorage.setItem('tecla',0);
    sessionStorage.setItem('resultado',0);
    sessionStorage.setItem('cant_ops',0);

    sessionStorage.setItem('ingresando_num1',true);
    sessionStorage.setItem('ingresando_num2',false);
    sessionStorage.setItem('ingresando_op',false);
    sessionStorage.setItem('calculando',false);

    this.imprimirDisplay("0");
  },
  imprimirDisplay: function(num){
    document.getElementById("display").innerHTML=num;
  },
  asignarEventoClickTeclas:function (){
    for (var i = 0; i < this.v_teclas.length; i++) {
      document.getElementById(this.v_teclas[i]).onclick=this.registrarTecla.bind(this);
    }
  },
  registrarTecla:function (event){
    sessionStorage.setItem('tecla',event.target.id);
    // this.leerTeclas(this.calcularOperacion(this.imprimirDisplay));
    this.leerTeclas();
  },
  leerTeclas:function () {
    // this.leerNum1(this.leerOperacion(this.leerNum2));
    this.leerNum(this.leerOperacion);
  },
  leerNum:function (fLeerOperacion) {
    var v_str_num1 =sessionStorage.getItem('num1');
    var v_str_num2 =sessionStorage.getItem('num2');
    var v_num1 = Number(v_str_num1);
    var v_num2 = Number(v_str_num2);
    var v_largo_num1 = JSON.parse(sessionStorage.getItem('largo_num1'));
    var v_largo_num2 = JSON.parse(sessionStorage.getItem('largo_num2'));
    var v_oper =sessionStorage.getItem('oper');
    var v_tecla = sessionStorage.getItem('tecla');
    var v_str_resultado = sessionStorage.getItem('resultado');
    var v_resultado = Number(v_str_resultado);
    var v_cant_ops = JSON.parse(sessionStorage.getItem('cant_ops'));

    var v_ingresando_num1 = JSON.parse(sessionStorage.getItem('ingresando_num1'));
    var v_ingresando_num2 = JSON.parse(sessionStorage.getItem('ingresando_num2'));
    var v_ingresando_op = JSON.parse(sessionStorage.getItem('ingresando_op'));
    var v_calculando = JSON.parse(sessionStorage.getItem('calculando'));

    if (v_tecla==="on"){this.resetear();return;}

    if (v_tecla==="igual"){
      sessionStorage.setItem('calculando',true);
      sessionStorage.setItem('ingresando_op',false);
      return;
    }

    if (isNaN(Number(v_tecla)) && v_tecla != "punto" && v_tecla != "sign") {
      sessionStorage.setItem('calculando',false);
      sessionStorage.setItem('ingresando_op',true);
      if (v_ingresando_num1) {
        sessionStorage.setItem('ingresando_num1',false);
        sessionStorage.setItem('ingresando_num2',true);
      }
      else {
        sessionStorage.setItem('ingresando_num1',true);
        sessionStorage.setItem('ingresando_num2',false);
      }
      fLeerOperacion();
      return;
    }
    else {
      sessionStorage.setItem('calculando',false);
      sessionStorage.setItem('ingresando_op',false);
    }

    if (v_tecla === "sign"){
      if (v_ingresando_num1){
        v_num1 = v_num1*(-1);
        v_str_resultado = v_num1.toString();
        sessionStorage.setItem('num1',v_str_resultado);
        sessionStorage.setItem('resultado',v_str_resultado);
        this.imprimirDisplay(v_str_resultado);
      }
      if (v_ingresando_num2){
        v_num2 = v_num2*(-1);
        v_str_resultado = v_num2.toString();
        sessionStorage.setItem('num2',v_str_resultado);
        sessionStorage.setItem('resultado',v_str_resultado);
        this.imprimirDisplay(v_str_resultado);
      }
      return;
    }

    if (v_tecla === "punto"){
      if (v_ingresando_num1) {
        if (v_str_num1 === "0") {v_largo_num1++;}
        if (!v_str_num1.includes(".")){v_str_num1 = v_str_num1+".";}
        sessionStorage.setItem('num1',v_str_num1);
        sessionStorage.setItem('largo_num1',v_largo_num1);
        this.imprimirDisplay(v_str_num1);
      }
      if (v_ingresando_num2) {
        if (v_str_num2 === "0") {v_largo_num2++;}
        if (!v_str_num2.includes(".")){v_str_num2 = v_str_num2+".";}
        sessionStorage.setItem('num2',v_str_num2);
        sessionStorage.setItem('largo_num2',v_largo_num2);
        this.imprimirDisplay(v_str_num2);
      }
    }
    else {
      if (v_ingresando_num1 && v_str_num1 == "0" && v_tecla === "0") {this.imprimirDisplay("0");return;}
      if (v_ingresando_num2 && v_str_num2 == "0" && v_tecla === "0") {this.imprimirDisplay("0");return;}

      if (v_largo_num1 < 8 && v_ingresando_num1){
        if (v_str_num1==="0"){
          sessionStorage.setItem('num1',v_tecla);
          this.imprimirDisplay(v_tecla);
        }
        else {
          sessionStorage.setItem('num1',v_str_num1+v_tecla);
          this.imprimirDisplay(v_str_num1+v_tecla);
        }
        sessionStorage.setItem('largo_num1',v_largo_num1 + 1);
      }
      else {
        sessionStorage.setItem('ingresando_num1',false);
      }

      if (v_largo_num2 < 8 && v_ingresando_num2){
        if (v_str_num2==="0"){
          sessionStorage.setItem('num2',v_tecla);
          this.imprimirDisplay(v_tecla);
        }
        else {
          sessionStorage.setItem('num2',v_str_num2+v_tecla);
          this.imprimirDisplay(v_str_num2+v_tecla);
        }
        sessionStorage.setItem('largo_num2',v_largo_num2 + 1);
      }
      else {
        sessionStorage.setItem('ingresando_num2',false);
      }
    }
  },
  leerOperacion: function () {
    var v_str_num1 =sessionStorage.getItem('num1');
    var v_str_num2 =sessionStorage.getItem('num2');
    var v_num1 = Number(v_str_num1);
    var v_num2 = Number(v_str_num2);
    var v_largo_num1 = JSON.parse(sessionStorage.getItem('largo_num1'));
    var v_largo_num2 = JSON.parse(sessionStorage.getItem('largo_num2'));
    var v_oper =sessionStorage.getItem('oper');
    var v_tecla = sessionStorage.getItem('tecla');
    var v_str_resultado = sessionStorage.getItem('resultado');
    var v_resultado = Number(v_str_resultado);
    var v_cant_ops = JSON.parse(sessionStorage.getItem('cant_ops'));

    var v_ingresando_num1 = JSON.parse(sessionStorage.getItem('ingresando_num1'));
    var v_ingresando_num2 = JSON.parse(sessionStorage.getItem('ingresando_num2'));
    var v_ingresando_op = JSON.parse(sessionStorage.getItem('ingresando_op'));
    var v_calculando = JSON.parse(sessionStorage.getItem('calculando'));

    if (v_ingresando_op) {
      sessionStorage.setItem('oper',v_tecla);
    }

    this.self.calcularOperacion();
  },
  calcularOperacion:function () {
    var v_str_num1 =sessionStorage.getItem('num1');
    var v_str_num2 =sessionStorage.getItem('num2');
    var v_num1 = Number(v_str_num1);
    var v_num2 = Number(v_str_num2);
    var v_largo_num1 = JSON.parse(sessionStorage.getItem('largo_num1'));
    var v_largo_num2 = JSON.parse(sessionStorage.getItem('largo_num2'));
    var v_oper =sessionStorage.getItem('oper');
    var v_tecla = sessionStorage.getItem('tecla');
    var v_str_resultado = sessionStorage.getItem('resultado');
    var v_resultado = Number(v_str_resultado);
    var v_cant_ops = JSON.parse(sessionStorage.getItem('cant_ops'));

    var v_ingresando_num1 = JSON.parse(sessionStorage.getItem('ingresando_num1'));
    var v_ingresando_num2 = JSON.parse(sessionStorage.getItem('ingresando_num2'));
    var v_ingresando_op = JSON.parse(sessionStorage.getItem('ingresando_op'));
    var v_calculando = JSON.parse(sessionStorage.getItem('calculando'));

    /*
    var v_num1 =sessionStorage.getItem('num1');
    var v_num2 =sessionStorage.getItem('num2');
    var v_largo_num1 = JSON.parse(sessionStorage.getItem('largo_num1'));
    var v_largo_num2 = JSON.parse(sessionStorage.getItem('largo_num2'));
    var v_ingresando_num1 = JSON.parse(sessionStorage.getItem('ingresando_num1'));
    var v_ingresando_num2 = JSON.parse(sessionStorage.getItem('ingresando_num2'));
    var v_oper = sessionStorage.getItem('oper');
    var v_calcular = JSON.parse(sessionStorage.getItem('calcular'));
    var tecla = sessionStorage.getItem('tecla');
    var v_resultado = sessionStorage.getItem('resultado');
    var result_num;
    var v_largo;

    if (v_calcular) {
      switch (v_oper) {
        case "sign":
          if (v_ingresando_num1) {
            result_num = Number(v_num1)*(-1);
            v_resultado = result_num.toString();
            v_largo = v_largo_num1;
            sessionStorage.setItem('ingresar_num1',true);
            sessionStorage.setItem('ingresando_num1',true);
            sessionStorage.setItem('ingresar_num2',false);
            sessionStorage.setItem('ingresando_num2',false);
            sessionStorage.setItem('num1',v_resultado);
            sessionStorage.setItem('num2',0);
            sessionStorage.setItem('largo_num1',v_largo);
            sessionStorage.setItem('largo_num2',0);
          }
          else {
            if (v_ingresando_num2){
              result_num = Number(v_num2)*(-1);
              v_resultado = result_num.toString();
              v_largo = v_largo_num2;
              sessionStorage.setItem('ingresar_num1',false);
              sessionStorage.setItem('ingresando_num1',false);
              sessionStorage.setItem('ingresar_num2',true);
              sessionStorage.setItem('ingresando_num2',true);
              sessionStorage.setItem('num1',0);
              sessionStorage.setItem('num2',v_resultado);
              sessionStorage.setItem('largo_num1',0);
              sessionStorage.setItem('largo_num2',v_largo);
            }
          }
          break;
          case "mas":
            result_num = Number(v_num1) + Number(v_num2);
            v_resultado = result_num.toString();
            v_largo = v_resultado.length;
            if (v_resultado.includes(".")) {
              v_largo--;
            }
            if (v_largo > 8){
              v_resultado="Infinity";
              this.resetear();
            }
            else {
              sessionStorage.setItem('ingresar_num1',true);
              sessionStorage.setItem('ingresando_num1',true);
              sessionStorage.setItem('ingresar_num2',false);
              sessionStorage.setItem('ingresando_num2',false);
              sessionStorage.setItem('num1',v_resultado);
              sessionStorage.setItem('num2',0);
              sessionStorage.setItem('largo_num1',v_largo);
              sessionStorage.setItem('largo_num2',0);
            }
            break;
          case "menos":
              result_num = Number(v_num1) - Number(v_num2);
              v_resultado = result_num.toString();
              v_largo = v_resultado.length;
              if (v_resultado.includes(".")) {
                v_largo--;
              }
              if (v_largo > 8){
                v_resultado="Infinity";
                this.resetear();
              }
              else {
                sessionStorage.setItem('ingresar_num1',true);
                sessionStorage.setItem('ingresando_num1',true);
                sessionStorage.setItem('ingresar_num2',false);
                sessionStorage.setItem('ingresando_num2',false);
                sessionStorage.setItem('num1',v_resultado);
                sessionStorage.setItem('num2',0);
                sessionStorage.setItem('largo_num1',v_largo);
                sessionStorage.setItem('largo_num2',0);
              }
              break;
          case "por":
            result_num = Number(v_num1) * Number(v_num2);
            v_resultado = result_num.toString();
            v_largo = v_resultado.length;
            if (v_resultado.includes(".")) {
              v_largo--;
            }
            if (v_largo > 8){
              v_resultado="Infinity";
              this.resetear();
            }
            else {
              sessionStorage.setItem('ingresar_num1',true);
              sessionStorage.setItem('ingresando_num1',true);
              sessionStorage.setItem('ingresar_num2',false);
              sessionStorage.setItem('ingresando_num2',false);
              sessionStorage.setItem('num1',v_resultado);
              sessionStorage.setItem('num2',0);
              sessionStorage.setItem('largo_num1',v_largo);
              sessionStorage.setItem('largo_num2',0);
            }
            break;
            case "dividido":
              result_num = Number(v_num1) / Number(v_num2);
              v_resultado = result_num.toString();
              v_largo = v_resultado.length;
              if (v_resultado.includes(".")) {
                v_largo--;
              }

              if (v_largo > 8){
                v_resultado="Infinity";
                this.resetear();
              }
              else {
                if (v_num2==="0") {
                  v_resultado="Error";
                  this.resetear();
                }
                else {
                  sessionStorage.setItem('ingresar_num1',true);
                  sessionStorage.setItem('ingresando_num1',true);
                  sessionStorage.setItem('ingresar_num2',false);
                  sessionStorage.setItem('ingresando_num2',false);
                  sessionStorage.setItem('num1',v_resultado);
                  sessionStorage.setItem('num2',0);
                  sessionStorage.setItem('largo_num1',v_largo);
                  sessionStorage.setItem('largo_num2',0);
                }
              }
              break;
        default:
      }
      sessionStorage.setItem('ingresar_op',false);
      sessionStorage.setItem('oper',false);
      sessionStorage.setItem('calcular',false);
      sessionStorage.setItem('tecla',0);
      sessionStorage.setItem('resultado',0);
      this.imprimirDisplay(v_resultado);
    }
    */
    alert("calcular op");
  }
}

Calculadora.init();
