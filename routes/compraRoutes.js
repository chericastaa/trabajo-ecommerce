const express = require('express')
const router = express.Router()
const { listarCompras, verCompra } = require('../controllers/compraController')

router.get('/', listarCompras)
router.get('/:id', verCompra)

module.exports = router