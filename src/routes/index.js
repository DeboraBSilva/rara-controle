const express = require('express')
const router = express.Router()

const homeController = require('../controllers/home')

const loginController = require('../controllers/login')

router.get('/', loginController.validar)

router.get('/home', homeController.home)

router.post('/home', homeController.incluir)

router.post('/login', loginController.validar)

module.exports = router