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

// parseFloat(5)
// num.toString()
// num.toPrecision()
// String(numero)
// Number(String)

var Calculadora = {
  v_largo_valor_display:1,
  v_num_display:0,
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

  init: function(){
    /*
    var b_mas = document.getElementById("mas")
    b_mas.addEventListener('click', function () {
      console.log("click on mas");
    })
    */
    document.sessionStorage.setItem = JSON.stringify({num1:"0"});
    this.v_num_display = this.ejecutaOperacion(this.menos, 3, 5);
    console.log(this.v_num_display);
  },
  mas: function (num1, num2) {
    return num1 + num2;
  },
  menos: function (num1, num2) {
    return num1 - num2;
  },
  ejecutaOperacion: function(op, num1, num2){
    return op(num1, num2);
  },
  imprimirDisplay: function(num){
    document.getElementById("display").innerHTML=num;
  }
}

Calculadora.init();
