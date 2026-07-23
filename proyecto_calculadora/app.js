let resultado = document.getElementById("resultado"); //scope global

//digitacion de numeros
function escribir1() {
  resultado.value += "1";
}
function escribir2() {
  resultado.value += "2";
}
function suma() {
  resultado.value += "+";
}
function limpiar() {
  resultado.value = " ";
}
function escribir3() {
  resultado.value += "3";
}
function escribir4() {
  resultado.value += "4";
}
function escribir5() {
  resultado.value += "5";
}
function escribir6() {
  resultado.value += "6";
}
function escribir7() {
  resultado.value += "7";
}
function escribir9() {
  resultado.value += "9";
}
function escribir0() {
  resultado.value += "0";
}
function resta() {
  resultado.value += "-";
}
function multiplicacion() {
  resultado.value += "*";
}
function division() {
  resultado.value += "/";
}
function escribir8() {
  resultado.value += "8";
}

//funciones para calcular

//hacemos el calculo de la expresion que esta en el input
function igual() {
  let total = eval(resultado.value); //uncion de java escrit que evalua expresiones
  // el escope de total es local
  console.log(total);
  resultado.value = total;
  alert(total);
}
