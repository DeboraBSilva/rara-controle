exports.validar = async (req, res) => {
    if (req.body.password == 'tron') {
        req.session.user = 'logado'
        res.redirect('/home')
    } else {
        res.render('login')
    }
}