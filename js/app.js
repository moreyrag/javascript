var Calculadora = {
  v_teclas: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "on", "sign", "dividido", "por", "menos", "punto", "igual", "mas"],
  v_display:"0",
  v_num1:"0",
  v_num2:"0",
  v_largo_num1:0,
  v_largo_num2:0,
  v_ingresar_num1:true,
  v_sesion_stg:window.sessionStorage,
  init: function(){
	   this.asignarEventoClickTeclas();
  },
  asignarEventoClickTeclas:function (){
    for (var i = 0; i < this.v_teclas.length; i++) {
      document.getElementById(this.v_teclas[i]).onclick=this.registrarTecla;
    }
  },
  registrarTecla:function (event){
    if (isNaN(Number(event.target.id))) {
        // alert("op");
        switch (event.target.id) {
          case "on":
            this.v_display="0";
            this.v_num1=null;
            this.v_num2=null;
            this.v_largo_num1=0;
            this.v_largo_num2=0;
            this.v_ingresar_num1=true;
            v_sesion_stg.num="0";
            this.imprimirDisplay(this.v_display);
            break;
          case "sign":
            this.v_display="0";
            this.imprimirDisplay(this.v_display);
            break;
          default:
        }
    } else {
      // alert("num")
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
    };
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
  },
  imprimirDisplay: function(num){
    document.getElementById("display").innerHTML=num;
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
