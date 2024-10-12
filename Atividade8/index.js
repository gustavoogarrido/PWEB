var idade = []
var sexo = []
var opiniao = []
var soma = 0
function input() {
    for (let i = 0; i < 3; i++) {
        var entr = prompt("Digite a idade: ")
        idade.push(parseInt(entr))
        soma += entr
        sexo.push((prompt("Digite o sexo: ")).toUpperCase())
        opiniao.push(prompt("Digite a sua opinião (4 = ótimo, 3 = bom, 2 = regular, 1 = péssimo): "))
    }
    media = soma / 3
    maxIdade = Math.max(idade)
    minIdade = Math.min(idade)
    pess = opiniao.filter(x => x =="1").length
    otiBom = opiniao.filter(x => x == "3" || x == "4").length
    homens = sexo.filter(x => x == "M").length
    mulheres = sexo.filter(x => x == "F").length
}
function output() {
    alert(`Media: ${media}\nMaior idade: ${maxIdade}\nMenor idade: ${minIdade}\nQtd Péssimas: ${pess}\nOtimas e boas: ${otiBom}\nHomens: ${homens}\nMulheres${mulheres}`)
}