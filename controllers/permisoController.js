const db = require('../models/database')

const listarPermisos = (req, res) => {
    db.all('SELECT * FROM permisos', [], (err, permisos) => {
        if (err) return res.send(err.message)
        res.render('permisos/index', { permisos })
    })
}

const mostrarFormCrear = (req, res) => {
    res.render('permisos/crear')
}

const crearPermiso = (req, res) => {
    const { nombre } = req.body
    db.run('INSERT INTO permisos (nombre) VALUES (?)', [nombre], (err) => {
        if (err) return res.send('El permiso ya existe')
        res.redirect('/permisos')
    })
}

const mostrarFormEditar = (req, res) => {
    const { id } = req.params
    db.get('SELECT * FROM permisos WHERE id = ?', [id], (err, permiso) => {
        if (err) return res.send(err.message)
        res.render('permisos/editar', { permiso })
    })
}

const editarPermiso = (req, res) => {
    const { id } = req.params
    const { nombre } = req.body
    db.run('UPDATE permisos SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
        if (err) return res.send('El permiso ya existe')
        res.redirect('/permisos')
    })
}

const eliminarPermiso = (req, res) => {
    const { id } = req.params
    db.run('DELETE FROM permisos WHERE id = ?', [id], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/permisos')
    })
}

module.exports = { listarPermisos, mostrarFormCrear, crearPermiso, mostrarFormEditar, editarPermiso, eliminarPermiso }
