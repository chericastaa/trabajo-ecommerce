const express = require('express')
const router = express.Router()
const { mostrarLogin, login, mostrarRegistro, registro, logout } = require('../controllers/authController')

router.get('/login', mostrarLogin)
router.post('/login', login)
router.get('/registro', mostrarRegistro)
router.post('/registro', registro)
router.get('/logout', logout)

module.exports = router