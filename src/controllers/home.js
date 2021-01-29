const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
});

exports.home = (req, res) => {

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

exports.incluir = async (req, res) => {
    console.log(req.body.jogador)
    const id = await knex('jogadores').insert({
        nome: req.body.jogador
    })
    if (id > 0) {
        res.render('home')
    } else {
        res.send('Problemas na inclusão')
    }
}

