# C-Bank - Sistema de Banco Digital

O C-Bank é um sistema de banco digital desenvolvido em Node.js com Express que permite aos usuários realizar diversas operações bancárias.

## Funcionalidades

O C-Bank oferece as seguintes funcionalidades:

- Cadastro de clientes com verificação de email e senha
- Consulta de saldo
- Depósito de fundos
- Saque de fundos
- Transferência de fundos para outros clientes
- Geração de extrato detalhado
- Edição de informações da conta
- Exclusão de conta

## Requisitos

Certifique-se de ter as seguintes dependências instaladas antes de executar o sistema:

- Node.js (você pode fazer o download em [nodejs.org](https://nodejs.org/))
- Outras dependências Node.js (você pode instalá-las com `npm install`)

## Configuração

1. Execute o seguinte comando para instalar as dependências do Node.js:

   ```bash
   npm install

## Uso 
Depois de configurar o sistema e instalar as dependências, você pode iniciar o servidor usando o seguinte comando: npm run dev

O servidor estará disponível em http://localhost:3000. Você pode usar uma ferramenta como o Insominia ou realizar chamadas HTTP diretamente para interagir com as funcionalidades do C-Bank.
## EndPoints da API

Endpoints da API
Aqui estão os endpoints disponíveis na API do C-Bank:

Listar Contas: GET /contas

Adicionar Conta: POST /contas

Editar Conta: PUT /contas/:numeroConta/usuario

Excluir Conta: DELETE /contas/:numero_conta

Depositar: POST /transacoes/depositar

Sacar: POST /transacoes/sacar

Transferir: POST /transacoes/transferir

Consultar Saldo: GET /contas/saldo

Gerar Extrato: GET /contas/extrato


Certifique-se de fornecer os dados necessários no corpo das solicitações, conforme apropriado para cada endpoint.
