const verificadorDeSenha = (req, res, next)=>{
    const { senha_banco } = req.query;
    if (!senha_banco) {
        res.status(400).json({
            "mensagem": "erro, requisição invalida!"
        });
    }
    if (senha_banco == 'Cubos123Bank') {

        next();

    }else{

        res.status(401).json({
            "mensagem": "A senha do banco informada é inválida!"
        });
    }
};

module.exports = verificadorDeSenha