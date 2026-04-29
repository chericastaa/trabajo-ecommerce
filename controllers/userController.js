const db = require('../models/database')

const listarUsuarios = (req, res) => {
    db.all('SELECT users.*, roles.nombre as rol FROM users LEFT JOIN roles ON users.rol_id = roles.id', [], (err, users) => {
        if (err) return res.send(err.message)
        db.all('SELECT * FROM roles', [], (err, roles) => {
            if (err) return res.send(err.message)
            res.render('users/index', { users, roles })
        })
    })
}

const mostrarUsuario = (req, res) => {
    const { id } = req.params
    db.get('SELECT users.*, roles.nombre as rol, roles.id as rol_id FROM users LEFT JOIN roles ON users.rol_id = roles.id WHERE users.id = ?', [id], (err, user) => {
        if (err) return res.send(err.message)
        db.all('SELECT permisos.nombre FROM permisos INNER JOIN rol_permiso ON permisos.id = rol_permiso.permiso_id WHERE rol_permiso.rol_id = ?', [user.rol_id], (err, permisos) => {
            if (err) return res.send(err.message)
            res.render('users/ver', { user, permisos })
        })
    })
}

const mostrarFormCrear = (req, res) => {
    db.all('SELECT * FROM roles', [], (err, roles) => {
        if (err) return res.send(err.message)
        res.render('users/crear', { roles })
    })
}

const crearUsuario = (req, res) => {
    const { nombre, email, rol_id } = req.body
    db.run('INSERT INTO users (nombre, email, rol_id) VALUES (?, ?, ?)', [nombre, email, rol_id], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/users')
    })
}

const eliminarUsuario = (req, res) => {
    const { id } = req.params
    db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/users')
    })
}

const editarRolUsuario = (req, res) => {
    const { id } = req.params
    const { rol_id } = req.body
    db.run('UPDATE users SET rol_id = ? WHERE id = ?', [rol_id, id], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/users')
    })
}

module.exports = { listarUsuarios, mostrarUsuario, mostrarFormCrear, crearUsuario, eliminarUsuario, editarRolUsuario }