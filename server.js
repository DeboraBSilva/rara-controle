const express = require('express')
const app = express()
const session = require('express-session')
require('dotenv').config()
const routes = require('./src/routes/index')

const port = process.env.PORT || 3002

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// app.use('/', (req, res, next) => {

//     if ('user' in req.session) {
//         return next()
//     }
//     console.log('carregou login')
//     res.render('login')
// })

app.use(session({
    secret: 'tron',
    resave: false,
    saveUninitialized: false
}))

app.use('/home', (req, res, next) => {
    if ('user' in req.session) {
        return next()
    }
    res.render('login')
})

app.use('/', routes)

app.listen(port, err => {
    if (err) {
        console.log('Nao foi possivel abrir o servidor')
    } else {
        console.log('Servidor ok')
    }
})


