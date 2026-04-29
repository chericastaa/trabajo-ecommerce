const express = require('express')
const router = express.Router()
const { listarProductos, verProducto, mostrarFormCrear, crearProducto, mostrarFormEditar, editarProducto, eliminarProducto } = require('../controllers/productoController')

router.get('/crear', mostrarFormCrear)
router.post('/crear', crearProducto)
router.get('/:id/editar', mostrarFormEditar)
router.post('/:id/editar', editarProducto)
router.get('/:id/eliminar', eliminarProducto)
router.get('/:id', verProducto)
router.get('/', listarProductos)

module.exports = router