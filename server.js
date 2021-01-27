const express = require('express')
const app = express()
const routes = require('./src/routes/index')

const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use('/', routes)

app.listen(port, err => {
    if (err) {
        console.log('Nao foi possivel abrir o servidor')
    } else {
        console.log('Servidor ok')
    }
})


