let { contas, quantidadeDeContas, depositos, transferencias, saques} = require('../banco de dados/bancodedados');
const OperacoesConta = require ('../verificadores');

const listarContas = (req, res)=>{

    res.status(200).json(contas);

};
const adicionarConta = (req, res)=>{
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {

        return res.status(404).json({"mensagem":"Favor adicione todos os dados de cadastro"});

    }

    const verificadorEmail = OperacoesConta.existeEmail(email);
    const verificadorDeCpf = OperacoesConta.existeCpf(cpf);

    if (verificadorEmail || verificadorDeCpf){
        return res.status(404).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"})
    };


    const contaNova = {

        numero_conta : quantidadeDeContas++,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        saldo : 0

    }
    contas.push(contaNova);
    
    return res.status(201).json(contaNova);
    
};
const editarConta = (req, res)=>{
    const { numeroConta } = req.params;
    let { nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    

    if (!nome || !email || !data_nascimento || !telefone || !email || !senha) {

        return res.status(404).json({"mensagem":"Favor adicione todos os dados de cadastro"});

    }
    
    const verificadorDeNumeroConta = OperacoesConta.existeNumeroConta(numeroConta);

    if (!verificadorDeNumeroConta) {

        return res.status(404).json({"mensagem":"Não foi encontrado o numero da conta informado"});
    }

    let contaSelecionada = OperacoesConta.buscarContaSelecionada(numeroConta);
    
    const existeOutroCpf = OperacoesConta.existeCpfRepetido(numeroConta, cpf)

    if (existeOutroCpf) {
        return res.status(404).json({
            "mensagem": "O CPF informado já existe cadastrado!"
        });
    }
    const existeOutroEmail = OperacoesConta.existeEmailRepetido(numeroConta, email)
    if (existeOutroEmail) {
        return res.status(404).json({
            "mensagem": "O Email informado já existe cadastrado!"
        });
    }

    
    let listaDeDados = [nome, email, data_nascimento, telefone, email, senha];
    for (const dado of listaDeDados) {
        if(!dado){
            dado = false;
        }
    };
    
    contaSelecionada = {
        
        numero_conta : contaSelecionada.numero_conta,
        nome : nome ?? contaSelecionada.nome,
        cpf : cpf ?? contaSelecionada.cpf,
        data_nascimento : data_nascimento ?? contaSelecionada.data_nascimento,
        telefone : telefone ?? contaSelecionada.telefone,
        email : email ?? contaSelecionada.email,
        senha: senha ?? contaSelecionada.senha,
        saldo: contaSelecionada.saldo
        
    };
    const posicaoConta = OperacoesConta.posicaoConta(numeroConta);
    
    contas.splice(posicaoConta, 1, contaSelecionada);
    return res.status(200).json(contaSelecionada);
}
const excluirConta = (req, res)=>{
    const {numero_conta} = req.params;

    const verificadorDeNumeroConta = OperacoesConta.existeNumeroConta(numero_conta);

    if (!verificadorDeNumeroConta) {

        return res.status(404).json({"mensagem":"Não foi encontrado o numero da conta informado"});    
    }
    const verificadorDeSaldo = OperacoesConta.verificadorSaldo(numero_conta);

    if (verificadorDeSaldo) {
        res.status(404).json({"mensagem": "A conta só pode ser removida se o saldo for zero!"})
    };

    const posicaoDaConta = OperacoesConta.posicaoConta(numero_conta);

    contas.splice(posicaoDaConta, 1);

    return res.status(200).json();
    

};
const depositar = (req, res)=>{

    const {numero_conta, valor} = req.body;

    console.log(req.body);

    if (!numero_conta || !valor) {

        return res.status(400).json({
            "mensagem": "O número da conta e o valor são obrigatórios!"
        });
    }   
    if (valor <= 0) {
        return res.status(400).json({"mensagem":"O valor para deposito é invalido tente novamente!"});
    }
    const verificarNumeroConta = OperacoesConta.existeNumeroConta(numero_conta);
    if (!verificarNumeroConta) {
        return res.status(404).json({"mensagem":"Não foi encontrado o numero da conta informado"});
    };
    const conta = OperacoesConta.buscarContaSelecionada(numero_conta);

    conta.saldo += Number(valor)
    const resumo = {
        data : new Date(),
        numero_conta,
        valor,
    }
    depositos.push( resumo );

    return res.status(200).json(resumo);

}
const sacar = (req, res)=>{
    const { numero_conta, valor, senha } = req.body;
    
    if (!numero_conta || !valor || !senha) {
       return res.status(404).json({"mensagem":"Informe os dados corretamente"});
    }
    if (valor <= 0) {
        return res.status(400).json({
            "mensagem": "O valor não pode ser menor que zero!"
        })
    }
    const verificarNumeroConta = OperacoesConta.existeNumeroConta(numero_conta);
    
    if (!verificarNumeroConta) {
        return res.status(404).json({"mensagem":"Numero da conta invalido verifique novamente"})
    }
    const verificarSenha = OperacoesConta.verificarSenha(senha, numero_conta);
    
    if (!verificarSenha) {
        return res.status(401).json({"mensagem":"senha incorreta"})
    }
    const conta = OperacoesConta.buscarContaSelecionada(numero_conta);

    if (valor > conta.saldo) {
        return res.status(403).json({"mensagem":"saldo insuficiente"});
    }

    const posicaoConta = OperacoesConta.posicaoConta(numero_conta);
    
    conta.saldo -= Number(valor);
    contas.splice(posicaoConta, 1, conta);
   
    const resumo = {
        data: new Date(),
        numero_conta,
        valor,
    }

    saques.push(resumo);
    return res.status(200).json(resumo);
}
const transferir = (req, res)=>{
    const { numero_conta_destino, numero_conta_origem, senha, valor } = req.body;
    
    if (!numero_conta_destino || !numero_conta_origem || !senha || !valor) {
        res.status(400).json({"mensagem":"Informe os dados corretamente"})
    }
    const existeNumeroConta = OperacoesConta.existeNumeroConta(numero_conta_destino);
    const existeNumeroContaOrigem = OperacoesConta.existeNumeroConta(numero_conta_origem);

    if (!existeNumeroConta || !existeNumeroContaOrigem) {
        res.status(400).json({"mensagem":"Numero da conta invalido verifique novamente"});
    };
    const senhaEstaCorreta = OperacoesConta.verificarSenha(senha, numero_conta_origem);

    if (!senhaEstaCorreta) {
        res.status(401).json({"mensagem":"senha incorreta"})
    }

    let contaOrigem = OperacoesConta.buscarContaSelecionada(numero_conta_origem);

    let contaDestino = OperacoesConta.buscarContaSelecionada(numero_conta_destino);
    
    if (contaOrigem.saldo < valor) {
       return res.status(403).json({"mensagem":"saldo insuficiente!"})
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const posicaoContaOrigem = OperacoesConta.posicaoConta(numero_conta_origem);
    const posicaoContaDestino = OperacoesConta.posicaoConta(numero_conta_destino);
    
    contas.splice(posicaoContaDestino, 1, contaDestino);
    contas.splice(posicaoContaOrigem, 1, contaOrigem);

    const resumo = {
        data: new Date (),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(resumo)

    return res.status(200).json(resumo);

};
const saldo = (req, res)=>{

    const {numero_conta, senha} = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({"mensagem":"Favor inserir os dados corretamente!"});
    }
    const existeConta = OperacoesConta.existeNumeroConta(numero_conta);
    if (!existeConta) {
       return res.status(400).json({"mensagem":"Conta bancária não encontada!"});
    }
    const senhaEstaCorreta = OperacoesConta.verificarSenha(senha, numero_conta);
    if (!senhaEstaCorreta) {
        return res.status(401).json({"mensagem":"senha incorreta tente novamente!"})
    }
    const conta = OperacoesConta.buscarContaSelecionada(numero_conta);

    saldoDaConta = {"sado":conta.saldo}

    return res.status(200).json(saldoDaConta);


}
const extrato = (req, res) =>{
    const {numero_conta, senha} = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({"mensagem":"Favor inserir os dados corretamente!"});
    }
    const senhaEstaCorreta = OperacoesConta.verificarSenha(senha, numero_conta);
    if (!senhaEstaCorreta) {
        return res.status(401).json({"mensagem":"senha incorreta tente novamente!"})
    }
    const existeConta = OperacoesConta.existeNumeroConta(numero_conta);
    if (!existeConta) {
        res.status(400).json({"mensagem":"Não foi encontrado a conta informada!"});
    }
    const saque = saques.filter((saque)=>{
        return saque.numero_conta == numero_conta;
    });
    const deposito = depositos.filter((deposito)=>{
        return deposito.numero_conta == numero_conta;
    });
    const transferenciasEnviadas = transferencias.filter((transferencia)=>{
        return transferencia.numero_conta_origem == numero_conta;
    });
    const transferenciasRecebidas = transferencias.filter((transferencia)=>{
        return transferencia.numero_conta_destino == numero_conta;
    });

    const resumo = {
        saque,
        deposito,
        transferencia : [{transferenciasEnviadas, transferenciasRecebidas}]
    }

    return res.status(200).json(resumo);


}

module.exports = {
    listarContas,
    adicionarConta,
    editarConta,
    excluirConta,
    depositar,
    sacar,
    transferir,
    saldo,
    extrato

}