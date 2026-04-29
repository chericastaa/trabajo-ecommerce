const express = require('express')
const router = express.Router()
const { listarRoles, mostrarFormCrear, crearRol, eliminarRol, mostrarFormEditar, editarRol } = require('../controllers/rolController')

router.get('/', listarRoles)
router.get('/crear', mostrarFormCrear)
router.post('/crear', crearRol)
router.get('/eliminar/:id', eliminarRol)
router.get('/:id/editar', mostrarFormEditar)
router.post('/:id/editar', editarRol)

module.exports = router
