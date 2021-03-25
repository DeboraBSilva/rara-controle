exports.partida = (req, res) => {
    res.render('partida', {
        mesaJogadores: JSON.parse(req.body.mesaJogadores),
        mesa: JSON.stringify(req.body.mesaJogadores)
    })
}