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
      document.getElementById(this.v_teclas[i]).onmousedown=this.reducirTamanio.bind(this);
    }
    for (var i = 0; i < this.v_teclas.length; i++) {
      document.getElementById(this.v_teclas[i]).onmouseup=this.recuperarTamanio.bind(this);
    }
    for (var i = 0; i < this.v_teclas.length; i++) {
      document.getElementById(this.v_teclas[i]).onclick=this.registrarTecla.bind(this);
    }
  },
  reducirTamanio: function (event) {
    switch (event.target.id) {
      case "mas":
        document.getElementById(event.target.id).style.width="81%";
        document.getElementById(event.target.id).style.height="90%";
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "punto":
      case "igual":
        document.getElementById(event.target.id).style.width="26%";
        document.getElementById(event.target.id).style.height="56.62px";
        break;
      default:
        document.getElementById(event.target.id).style.width="20%";
        document.getElementById(event.target.id).style.height="56.62px";
    }
  },
  recuperarTamanio: function (event) {
    switch (event.target.id) {
      case "mas":
        document.getElementById(event.target.id).style.width="90%";
        document.getElementById(event.target.id).style.height="100%";
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "punto":
      case "igual":
        document.getElementById(event.target.id).style.width="29%";
        document.getElementById(event.target.id).style.height="62.91px";
        break;
      default:
        document.getElementById(event.target.id).style.width="22%";
        document.getElementById(event.target.id).style.height="62.91px";
    }
  },
  registrarTecla:function (event){
    sessionStorage.setItem('tecla',event.target.id);
    // this.leerTeclas(this.calcularOperacion(this.imprimirDisplay));
    this.leerTeclas();
  },
  leerTeclas:function () {
    // this.leerNum1(this.leerOperacion(this.leerNum2));
    this.leerNum(this.leerOperacion, this.calcularOperacion);
  },
  leerNum:function (fLeerOperacion, fCalcularOp) {
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
      // return;
      fCalcularOp();
      return;
    }
    else {
      sessionStorage.setItem('calculando',false);
    }

    if (isNaN(Number(v_tecla)) && v_tecla != "punto" && v_tecla != "sign" && v_tecla != "igual") {
      sessionStorage.setItem('calculando',false);

      if (v_ingresando_num1) {
        sessionStorage.setItem('ingresando_num1',false);
        sessionStorage.setItem('ingresando_num2',true);
        sessionStorage.setItem('cant_ops',"1");
      }
      /*
      else {
        sessionStorage.setItem('ingresando_num1',true);
        sessionStorage.setItem('ingresando_num2',false);
      }*/

      sessionStorage.setItem('ingresando_op',true);
      fLeerOperacion();
      return;
    }
    else {
      // sessionStorage.setItem('calculando',false);
      sessionStorage.setItem('ingresando_op',false);
    }

    if (v_tecla === "sign"){
      if (v_ingresando_num1 || (!v_ingresando_num1 && !v_ingresando_num2)){
        v_num1 = v_num1*(-1);
        v_str_resultado = v_num1.toString();
        sessionStorage.setItem('num1',v_str_resultado);
        sessionStorage.setItem('resultado',v_str_resultado);
        this.imprimirDisplay(v_str_resultado);

        sessionStorage.setItem('cant_ops',"1");
      }
      if (v_ingresando_num2){
        v_num2 = v_num2*(-1);
        v_str_resultado = v_num2.toString();
        sessionStorage.setItem('num2',v_str_resultado);
        sessionStorage.setItem('resultado',v_str_resultado);
        this.imprimirDisplay(v_str_resultado);

        sessionStorage.setItem('cant_ops',"2");
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

        sessionStorage.setItem('cant_ops',"1");
      }
      if (v_ingresando_num2) {
        if (v_str_num2 === "0") {v_largo_num2++;}
        if (!v_str_num2.includes(".")){v_str_num2 = v_str_num2+".";}
        sessionStorage.setItem('num2',v_str_num2);
        sessionStorage.setItem('largo_num2',v_largo_num2);
        this.imprimirDisplay(v_str_num2);

        sessionStorage.setItem('cant_ops',"2");
      }
    }
    else {
      if (v_ingresando_num1 && v_str_num1 == "0" && v_tecla === "0") {
        this.imprimirDisplay("0");
        sessionStorage.setItem('cant_ops',"1");
        return;
      }
      if (v_ingresando_num2 && v_str_num2 == "0" && v_tecla === "0") {
        this.imprimirDisplay("0");
        sessionStorage.setItem('cant_ops',"2");
        return;
      }

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

        sessionStorage.setItem('cant_ops',"1");
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

        sessionStorage.setItem('cant_ops',"2");
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
      sessionStorage.setItem('ingresando_num2',true);
      sessionStorage.setItem('num2',"0");
      sessionStorage.setItem('largo_num2',"0");
      this.self.calcularOperacion();
    }
  },
  calcularLargo:function(num, largorequerido){
    // retorna objeto con un array[largoTotal, numero truncado al largorequerido]
    var parteEntera = parseInt(num.toString());
    var numResult = Number(num);
    var parteDecimal = numResult - Math.floor(numResult);
    var largoTotal = num.toString().length;
    var largoEntero = parteEntera.toString().length;
    var largoDecimal = parteDecimal.toString().length;

    var infolargo = {largoTotal:0, numResult:0};

    var numResultStr = numResult.toString();

    if (num.toString().includes(".")) {largoTotal--;}

    if (largoTotal <= largorequerido){
      infolargo.largoTotal = largoTotal;
      infolargo.numResult = numResult;
    }
    else { // verificar si se puede truncar parte decimal
      if (largoEntero > largorequerido) {
        // infolargo.largoTotal = Infinity;
        // infolargo.numResult = Infinity;
        infolargo.largoTotal = largorequerido;
        infolargo.numResult = Number(numResultStr.substring(0,largorequerido));
      }
      else { // truncar parte decimal para que cumpla con el largorequerido
        numResult = parteEntera;
        // alert(numResult);
        parteDecimal = parteDecimal.toPrecision(largorequerido - largoEntero);
        // alert(parteDecimal);
        if (Number(parteDecimal) == 0){largoDecimal = 0;}
        if (largoDecimal == 0){
          infolargo.largoTotal = largoEntero;
          infolargo.numResult = parteEntera;
        }
        else {
          infolargo.numResult = numResult + Number(parteDecimal);
          infolargo.largoTotal = infolargo.numResult.toString().length-1;
        }
      }
    }

    return infolargo;
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

    var result_num, infoLargo;

    if (v_tecla == "igual") {
      if (v_cant_ops == 0){
        this.self.resetear();
        v_str_resultado="0";
        return;
      }

      if (v_ingresando_op){
        v_cant_ops = 2;
        v_num2 = v_num1;
      }

      if (v_cant_ops == 2){
        switch (v_oper) {
          case "mas":
            result_num = Number(v_num1) + Number(v_num2);
            v_str_resultado = result_num.toString();
            this.self.resetear();
            infoLargo = this.self.calcularLargo(v_str_resultado, 8);
            v_str_resultado = infoLargo.numResult;
            v_largo_num1 = infoLargo.largoTotal;
            sessionStorage.setItem('resultado',v_str_resultado);
            sessionStorage.setItem('num1',v_str_resultado);
            sessionStorage.setItem('largo_num1',v_largo_num1);
            sessionStorage.setItem('num2',v_str_num2);
            sessionStorage.setItem('largo_num2',v_largo_num2);
            sessionStorage.setItem('cant_ops',"2");
            sessionStorage.setItem('oper',v_oper);
            sessionStorage.setItem('tecla',v_tecla);
            sessionStorage.setItem('ingresando_num1',false);
            sessionStorage.setItem('ingresando_op',false);
            break;
            case "menos":
              result_num = Number(v_num1) - Number(v_num2);
              v_str_resultado = result_num.toString();
              this.self.resetear();
              infoLargo = this.self.calcularLargo(v_str_resultado, 8);
              v_str_resultado = infoLargo.numResult;
              v_largo_num1 = infoLargo.largoTotal;
              sessionStorage.setItem('resultado',v_str_resultado);
              sessionStorage.setItem('num1',v_str_resultado);
              sessionStorage.setItem('largo_num1',v_largo_num1);
              sessionStorage.setItem('num2',v_str_num2);
              sessionStorage.setItem('largo_num2',v_largo_num2);
              sessionStorage.setItem('cant_ops',"2");
              sessionStorage.setItem('oper',v_oper);
              sessionStorage.setItem('tecla',v_tecla);
              sessionStorage.setItem('ingresando_num1',false);
              sessionStorage.setItem('ingresando_op',false);
              break;
              case "dividido":
                if (Number(v_num2) == 0) {
                  alert("Error");
                  this.self.resetear();
                  return;
                }
                result_num = Number(v_num1) / Number(v_num2);
                v_str_resultado = result_num.toString();
                this.self.resetear();
                infoLargo = this.self.calcularLargo(v_str_resultado, 8);
                v_str_resultado = infoLargo.numResult;
                v_largo_num1 = infoLargo.largoTotal;
                sessionStorage.setItem('resultado',v_str_resultado);
                sessionStorage.setItem('num1',v_str_resultado);
                sessionStorage.setItem('largo_num1',v_largo_num1);
                sessionStorage.setItem('num2',v_str_num2);
                sessionStorage.setItem('largo_num2',v_largo_num2);
                sessionStorage.setItem('cant_ops',"2");
                sessionStorage.setItem('oper',v_oper);
                sessionStorage.setItem('tecla',v_tecla);
                sessionStorage.setItem('ingresando_num1',false);
                sessionStorage.setItem('ingresando_op',false);
                break;
                case "por":
                  result_num = Number(v_num1) * Number(v_num2);
                  v_str_resultado = result_num.toString();
                  this.self.resetear();
                  infoLargo = this.self.calcularLargo(v_str_resultado, 8);
                  v_str_resultado = infoLargo.numResult;
                  v_largo_num1 = infoLargo.largoTotal;
                  sessionStorage.setItem('resultado',v_str_resultado);
                  sessionStorage.setItem('num1',v_str_resultado);
                  sessionStorage.setItem('largo_num1',v_largo_num1);
                  sessionStorage.setItem('num2',v_str_num2);
                  sessionStorage.setItem('largo_num2',v_largo_num2);
                  sessionStorage.setItem('cant_ops',"2");
                  sessionStorage.setItem('oper',v_oper);
                  sessionStorage.setItem('tecla',v_tecla);
                  sessionStorage.setItem('ingresando_num1',false);
                  sessionStorage.setItem('ingresando_op',false);
                  break;

          default:

        }
      }

      this.self.imprimirDisplay(v_str_resultado);
      return;
    }
  }
}

Calculadora.init();
