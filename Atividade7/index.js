function ppt() {
    let escolha = prompt("Escolha Pedra Papel ou Tesoura:")
    if (escolha.toUpperCase() == "PEDRA" || escolha.toUpperCase() == "PAPEL" || escolha.toUpperCase() == "TESOURA") {
        let sla = Math.random()
        let escolhaMaq = sla < 0.30 ? "Tesoura" : (sla < 0.60 ? "Papel" : "Pedra")
        alert("A maquina escolheu: " + escolhaMaq)
        player = escolha.toUpperCase() == "PEDRA" && escolhaMaq.toUpperCase() == "TESOURA" || escolha.toUpperCase() == "TESOURA" && escolhaMaq.toUpperCase() == "PAPEL" || escolha.toUpperCase() == "PAPEL" && escolhaMaq.toUpperCase() == "PEDRA"
        machine = escolha.toUpperCase() == "TESOURA" && escolhaMaq.toUpperCase() == "PEDRA" || escolha.toUpperCase() == "PAPEL" && escolhaMaq.toUpperCase() == "TESOURA" || escolha.toUpperCase() == "PEDRA" && escolhaMaq.toUpperCase() == "PAPEL"
        if (player == machine) {
            alert("Empate")
        }
        else if (player) {
            alert("Parabens, você ganhou")
        }
        else {
            alert("Infelizmente você perdeu")
        }
    }
    else {
        alert("Resposta inválida")
    }
}