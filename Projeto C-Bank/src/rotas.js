const express = require ('express');
const {listarContas, adicionarConta, editarConta, excluirConta, depositar, sacar, transferir, saldo, extrato} = require ('./controladores/contas');
const roteador = express();


roteador.get('/contas',listarContas);
roteador.post('/contas',adicionarConta);
roteador.put('/contas/:numeroConta/usuario',editarConta);
roteador.delete('/contas/:numero_conta',excluirConta);
roteador.post('/transacoes/depositar',depositar);
roteador.post('/transacoes/sacar',sacar);
roteador.post('/transacoes/transferir',transferir);
roteador.get('/contas/saldo',saldo);
roteador.get('/contas/extrato',extrato);




module.exports = roteador;