const express = require('express')
const router = express.Router()
const { verCarrito, agregarAlCarrito, eliminarDelCarrito, confirmarCompra } = require('../controllers/carritoController')

router.get('/', verCarrito)
router.post('/agregar', agregarAlCarrito)
router.get('/eliminar/:id', eliminarDelCarrito)
router.post('/confirmar', confirmarCompra)

module.exports = router