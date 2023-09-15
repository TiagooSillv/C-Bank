const express = require ('express');
const roteador = require ('./rotas');
const verificadorDeSenha = require ('./intermediarios')

const app = express();

app.use(express.json());
app.use(verificadorDeSenha)
app.use(roteador);

app.listen(3000,()=>{console.log("server online");})
