const express = require('express')
const router = express.Router()
const { listarUsuarios, mostrarUsuario, mostrarFormCrear, crearUsuario, eliminarUsuario, editarRolUsuario } = require('../controllers/userController')

router.get('/', listarUsuarios)
router.get('/crear', mostrarFormCrear)
router.post('/crear', crearUsuario)
router.get('/eliminar/:id', eliminarUsuario)
router.post('/:id/rol', editarRolUsuario)
router.get('/:id', mostrarUsuario)

module.exports = router