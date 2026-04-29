const db = require('../models/database')

const listarRoles = (req, res) => {
    db.all('SELECT * FROM roles', [], (err, roles) => {
        if (err) return res.send(err.message)
        res.render('roles/index', { roles })
    })
}

const mostrarFormCrear = (req, res) => {
    res.render('roles/crear')
}

const crearRol = (req, res) => {
    const { nombre } = req.body
    db.run('INSERT INTO roles (nombre) VALUES (?)', [nombre], (err) => {
        if (err) return res.send('El rol ya existe')
        res.redirect('/roles')
    })
}

const eliminarRol = (req, res) => {
    const { id } = req.params
    db.run('DELETE FROM roles WHERE id = ?', [id], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/roles')
    })
}

const mostrarFormEditar = (req, res) => {
    const { id } = req.params
    db.get('SELECT * FROM roles WHERE id = ?', [id], (err, rol) => {
        if (err) return res.send(err.message)
        db.all('SELECT * FROM permisos', [], (err, permisos) => {
            if (err) return res.send(err.message)
            db.all('SELECT permiso_id FROM rol_permiso WHERE rol_id = ?', [id], (err, asignados) => {
                if (err) return res.send(err.message)
                const asignadosIds = asignados.map(a => a.permiso_id)
                res.render('roles/editar', { rol, permisos, asignadosIds })
            })
        })
    })
}

const editarRol = (req, res) => {
    const { id } = req.params
    const permisos = req.body.permisos ? [].concat(req.body.permisos) : []
    db.run('DELETE FROM rol_permiso WHERE rol_id = ?', [id], (err) => {
        if (err) return res.send(err.message)
        permisos.forEach(permiso_id => {
            db.run('INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (?, ?)', [id, permiso_id])
        })
        res.redirect('/roles')
    })
}

module.exports = { listarRoles, mostrarFormCrear, crearRol, eliminarRol, mostrarFormEditar, editarRol }