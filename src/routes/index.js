const express = require('express')
const router = express.Router()

const homeController = require('../controllers/home')

const loginController = require('../controllers/login')

const partidaController = require('../controllers/partida')

router.get('/', loginController.validar)

router.get('/home', homeController.getListaJogadores)

router.post('/home', homeController.incluirJogador)

router.post('/login', loginController.validar)

router.post('/partida', partidaController.partida)

module.exports = router