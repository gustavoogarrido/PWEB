function imc(altura, peso){
    let imc = peso / (altura * altura)
    if(imc < 18.5){
        alert("MAGREZA, GRAU DE OBESIDADE 0")
    }
    else if(imc <= 24.9){
        alert("NORMAL, GRAU DE OBESIDADE 0")
    }
    else if(imc <= 29.9){
        alert("SOBREPESO, GRAU DE OBESIDADE 1")
    }
    else if(imc <= 39.9){
        alert("OBESIDADE, GRAU 2")
    }
    else{
        alert("OBESIDADE GRAVE, GRAU 3")
    }
}