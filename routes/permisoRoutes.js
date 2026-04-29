const express = require('express')
const router = express.Router()
const { listarPermisos, mostrarFormCrear, crearPermiso, mostrarFormEditar, editarPermiso, eliminarPermiso } = require('../controllers/permisoController')

router.get('/', listarPermisos)
router.get('/crear', mostrarFormCrear)
router.post('/crear', crearPermiso)
router.get('/:id/editar', mostrarFormEditar)
router.post('/:id/editar', editarPermiso)
router.get('/eliminar/:id', eliminarPermiso)

module.exports = router