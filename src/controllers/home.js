const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
});

exports.getListaJogadores = (req, res) => {
    knex.select('id', 'nome').from('jogadores').orderBy('nome')
        .then((nomes) => {
            res.render('home', {
                nomes
            })
        }).catch(error => {
            console.log(error);
            res.send('erro ')
        })
}

exports.incluirJogador = async (req, res) => {
    const id = await knex('jogadores').insert({
        nome: req.body.jogador
    })
    if (id > 0) {
        this.getListaJogadores(req,res)
    } else {
        res.send('Problemas na inclusão')
    }
}

