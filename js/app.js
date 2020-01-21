var Calculadora = {
  v_teclas: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "on", "sign", "dividido", "por", "menos", "punto", "igual", "mas"],
  v_ingresar_num2:false,
  init: function(){
     sessionStorage.setItem('num1',null);
     sessionStorage.setItem('num2',null);
     sessionStorage.setItem('oper',null);
     sessionStorage.setItem('result',"0");
	   this.asignarEventoClickTeclas();
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
    var num1 =JSON.parse(sessionStorage.getItem('num1'));
    var num2 =JSON.parse(sessionStorage.getItem('num2'));
    var oper_anterior =JSON.parse(sessionStorage.getItem('oper'));
    var oper = event.target.id;
    var result =JSON.parse(sessionStorage.getItem('result'));
    if (isNaN(Number(oper))) {
        // alert("op");
        sessionStorage.setItem('oper',oper);
        switch (oper) {
          case "on":
            sessionStorage.setItem('num1',null);
            sessionStorage.setItem('num2',null);
            sessionStorage.setItem('oper',null);
            sessionStorage.setItem('result',"0");
            break;
          case "sign":
            if (!v_ingresar_num2){
              if (!num1 || num1 ==="0") {
                sessionStorage.setItem('result',"0");
              } else {
                sessionStorage.setItem('result',"-"+num1);
                sessionStorage.setItem('num1',"-"+num1);
              }
            }
            else {
              if (!num2 || num2 ==="0") {
                sessionStorage.setItem('result',"0");
              } else {
                sessionStorage.setItem('result',"-"+num2);
                sessionStorage.setItem('num2',"-"+num2);
              }
            }
            break;
          case "dividido":
              v_ingresar_num2 = true;
              sessionStorage.setItem('result',"0");
              sessionStorage.setItem('num2',null);
              break;
          case "por":
              v_ingresar_num2 = true;
              sessionStorage.setItem('result',"0");
              sessionStorage.setItem('num2',null);
              break;
          case "menos":
              v_ingresar_num2 = true;
              sessionStorage.setItem('result',"0");
              sessionStorage.setItem('num2',null);
              break;
          case "punto":
              if (!v_ingresar_num2){
                sessionStorage.setItem('result',num1+".");
                sessionStorage.setItem('num1',num1+".");
              }
              else{
                sessionStorage.setItem('result',num2+".");
                sessionStorage.setItem('num2',num2+".");
              }
              break;
          case "igual":
              // click en el igual sin
              if (!v_ingresar_num2 && (oper_anterior == "mas" || oper_anterior == "menos" || oper_anterior=="mas" || oper_anterior="dividido")){
                result = this.operacion(num1, )
                sessionStorage.setItem('result',this.operacion());
              }

              v_ingresar_num2 = false;


              break;
          default:
        }

        this.imprimirDisplay(JSON.parse(sessionStorage.getItem('num1')));
    } else {
      alert("num")
      /*
      if (this.v_ingresar_num1 && this.v_largo_num1 < 8 && this.v_num1!="0"){
        this.v_num1=this.v_num1+event.target.id;
        this.v_largo_num1++;
        alert("v_num1:" + this.v_num1);
      }
      else if (this.v_largo_num2 < 8 && this.v_num2!="0") {
        this.v_num2=this.v_num2+event.target.id;
        this.v_largo_num2++;
        alert("v_num2:" + this.v_num2);
      }
      */
    }
  },
  operacion: function (num1, num2){
  	return {
  		on:0,
  		sign: -num1,
  		dividido: num1 / num2,
  		por: num1 * num2,
  		menos:num1 - num2,
  		mas: num1 + num2,
  		resta: num1 - num2
  	}
  }
}

Calculadora.init();

/*
var v_display = document.getElementById('display');
v_display.addEventListener("click",function(event){
  var mensaje = "Hiciste click en display la posicion ->  X: "+event.clientX+" Y: "+event.clientY;
  console.log(mensaje);
});

var v_on = document.getElementById('on');
v_display.addEventListener("click",function(event){
  var mensaje = "Hiciste click en on la posicion ->  X: "+event.clientX+" Y: "+event.clientY;
  console.log(mensaje);
});
*/
// parseFloat(5)
// num.toString()
// num.toPrecision()
// String(numero)
// Number(String)

/*
  v_largo_valor_display:1,
  v_str_display:"0",
  v_teclas_nums: [0,1,2,3,4,5,6,7,8,9],
  v_id_on: "on",
  v_id_sign: "sign",
  v_id_dividido: "dividido",
  v_id_por: "por",
  v_id_menos: "menos",
  v_id_punto: "punto",
  v_id_igual: "igual",
  v_id_mas: "mas",
  v_teclas_op: [this.v_id_mas, this.v_id_menos, this.v_id_por, this.v_id_dividido, this.v_id_sign],

*/


    /*
    var b_mas = document.getElementById("mas")
    b_mas.addEventListener('click', function () {
    console.log("click on mas");
    document.sessionStorage.setItem = JSON.stringify({num1:"0"});
    this.v_num_display = this.ejecutaOperacion(this.menos, 3, 5);
    console.log(this.v_num_display);
	console.log(this.operacion(3,8).sign)
	this.imprimirDisplay(8)
	this.imprimirDisplay(this.operacion(3,0).dividido)
	console.log(this.v_digitos_num1.length)
	})
    */
