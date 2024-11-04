class Retangulo {
    constructor(base, altura) {
        this.base = base
        this.altura = altura
        alert(this.base * this.altura)
    }
}

class Conta {
    constructor(nome, correntista, banco, nConta, saldo) {
        this.nome = nome
        this.correntista = correntista
        this.banco = banco
        this.nConta = nConta
        this.saldo = saldo
    }

    getNome() {
        return this.nome;
    }

    getCorrentista() {
        return this.correntista;
    }

    getBanco() {
        return this.banco;
    }

    getNConta() {
        return this.nConta;
    }

    getSaldo() {
        return this.saldo;
    }

}
class Corrente extends Conta {
    constructor(nome, correntista, banco, nConta, saldo, salEspecial) {
        super(nome, correntista, banco, nConta, saldo)
        this.salEspecial = salEspecial
    }
    getsalEspecial() {
        return this.salEspecial;
    }
    getAll() {
        alert(`Nome = ${super.getNome()}\nCorrentista = ${super.getCorrentista()}\nBanco = ${super.getBanco()}\nNumero da conta = ${super.getNConta()}\nSaldo = ${super.getSaldo()}\nSaldo Especial = ${this.getsalEspecial()}`)
    }

}

class Poupanca extends Conta {
    constructor(nome, correntista, banco, nConta, saldo, juros, dtVencimento) {
        super(nome, correntista, banco, nConta, saldo)
        this.juros = juros
        this.dtVencimento = dtVencimento
    }
    getJuros() {
        return this.juros;
    }
    getDtVencimento() {
        return this.dtVencimento
    }
    getAll() {
        alert(`Nome = ${super.getNome()}\nCorrentista = ${super.getCorrentista()}\nBanco = ${super.getBanco()}\nNumero da conta = ${super.getNConta()}\nSaldo = ${super.getSaldo()}\nJuros = ${this.getJuros()}\nData de Vencimento = ${this.getDtVencimento()}`)
    }
}

function criarObjetoC() {
    var nome = prompt("Digite o nome:")
    var banco = prompt("Digite o banco:")
    var correntista = prompt("Digite o correntista:")
    var nConta = prompt("Digite o numero da conta:")
    var saldo = prompt("Digite o saldo da conta:")
    var salEspecial = prompt("Digite o saldo especial:")
    var objCorrente = new Corrente(nome, correntista, banco, nConta, saldo, salEspecial)
    objCorrente.getAll()
}
function criarObjetoP(){
    var nome = prompt("Digite o nome:")
    var banco = prompt("Digite o banco:")
    var correntista = prompt("Digite o correntista:")
    var nConta = prompt("Digite o numero da conta:")
    var saldo = prompt("Digite o saldo da conta:")
    var juros = prompt("Digite o juros:")
    var dtVencimento = prompt("Digite a data de vencimento:")
    var objPoupanca = new Poupanca(nome, correntista, banco, nConta, saldo, juros, dtVencimento)
    objPoupanca.getAll()
}
