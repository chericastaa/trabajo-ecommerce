const db = require('../models/database')
const bcrypt = require('bcryptjs')

const mostrarLogin = (req, res) => {
    res.render('auth/login')
}

const login = (req, res) => {
    const { email, password } = req.body
    db.get('SELECT users.*, roles.nombre as rol FROM users LEFT JOIN roles ON users.rol_id = roles.id WHERE users.email = ?', [email], (err, user) => {
        if (err) return res.send(err.message)
        if (!user) return res.render('auth/login', { error: 'Email o contraseña incorrectos' })
        const passwordValida = bcrypt.compareSync(password, user.password)
        if (!passwordValida) return res.render('auth/login', { error: 'Email o contraseña incorrectos' })
        req.session.user = user
        res.redirect('/')
    })
}

const mostrarRegistro = (req, res) => {
    res.render('auth/registro')
}

const registro = (req, res) => {
    const { nombre, email, password } = req.body
    const hash = bcrypt.hashSync(password, 10)
    db.get('SELECT COUNT(*) as total FROM users', [], (err, row) => {
        if (err) return res.send(err.message)
        const esAdmin = row.total === 0
        db.get('SELECT id FROM roles WHERE nombre = ?', [esAdmin ? 'admin' : 'cliente'], (err, rol) => {
            if (err) return res.send(err.message)
            if (!rol) return res.render('auth/registro', { error: 'Primero creá los roles admin y cliente' })
            db.run('INSERT INTO users (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)', [nombre, email, hash, rol.id], (err) => {
                if (err) return res.render('auth/registro', { error: 'El email ya existe' })
                res.redirect('/auth/login')
            })
        })
    })
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

module.exports = { mostrarLogin, login, mostrarRegistro, registro, logout }