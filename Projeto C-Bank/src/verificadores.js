let { contas } = require('./banco de dados/bancodedados');

const OperacoesConta = {
    existeCpf : (cpf)=>{
        const verificadorDeCpf = contas.find((conta)=>{
            return conta.cpf == cpf;
        });
        if (verificadorDeCpf) {
            return true; 
        }else { 
            return false;
         }
    },
    existeEmail : (email)=>{
        const verificadorDeEmail = contas.find((conta)=>{
            return conta.email == email;
        });

        if (verificadorDeEmail) {
            return true; 
        }else{
            return false;
        }
    },
    existeNumeroConta : (numero_conta)=>{
        const verificador = contas.find((conta)=>{
            return conta.numero_conta == numero_conta;
        });
       
        if (verificador) {
            return true;
        }else{
            return false;
        }
    },
    verificadorSaldo : (numero_conta)=>{
        const conta = contas.find((conta)=>{
            return conta.numero_conta == numero_conta;
        });
        
        if (conta.saldo == 0) {
            return false;
        }else{
            return true;
        }
    },
    verificarSenha : (senha, numero_conta)=>{
        const senhaDaConta = contas.find((conta)=>{
            return conta.numero_conta == numero_conta;
        });
        if (senhaDaConta.senha == senha) {
            return true;
        }else{
            return false;
        }
    },
    existeCpfRepetido : (numeroConta, cpf)=>{
        const contasRestantes = contas.filter((conta)=>{
            return conta.numero_conta != numeroConta;
        });
        console.log(contasRestantes);
        const existeCpf = contasRestantes.find((conta)=>{
            return conta.cpf == cpf;
        });
        if (existeCpf) {
            return true;
        }else{
            return false;
        }
    },
    existeEmailRepetido : (numeroConta, email)=>{
        const contasRestantes = contas.filter((conta)=>{
            return conta.numero_conta != numeroConta;
        });
        const existeEmail = contasRestantes.find((conta)=>{
            return conta.email == email;
        });
        if (existeEmail) {
            return true;
        }else{
            return false;
        }
    },
    posicaoConta : (numero_conta)=>{
        const posicaoDaConta = contas.indexOf((conta)=>{
            return conta.numero_conta == numero_conta;
        });

        return posicaoDaConta;
    },
    buscarContaSelecionada : (numero_conta)=>{
        let contaSelecionada = contas.find((conta)=>{
            return conta.numero_conta == numero_conta;
        });
        return contaSelecionada;
    }
    

    
    
}


module.exports = OperacoesConta