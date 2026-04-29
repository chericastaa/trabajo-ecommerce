const db = require('../models/database')

const listarProductos = (req, res) => {
    db.all('SELECT * FROM productos', [], (err, productos) => {
        if (err) return res.send(err.message)
        res.render('productos/index', { productos })
    })
}

const verProducto = (req, res) => {
    const { id } = req.params
    db.get('SELECT * FROM productos WHERE id = ?', [id], (err, producto) => {
        if (err) return res.send(err.message)
        res.render('productos/ver', { producto })
    })
}

const mostrarFormCrear = (req, res) => {
    res.render('productos/crear')
}

const crearProducto = (req, res) => {
    const { nombre, descripcion, precio, stock, imagen } = req.body
    if (precio < 0) return res.send('El precio no puede ser negativo')
    if (stock < 0) return res.send('El stock no puede ser negativo')
    db.run('INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, precio, stock, imagen], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/productos')
    })
}

const mostrarFormEditar = (req, res) => {
    const { id } = req.params
    db.get('SELECT * FROM productos WHERE id = ?', [id], (err, producto) => {
        if (err) return res.send(err.message)
        res.render('productos/editar', { producto })
    })
}

const editarProducto = (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, precio, stock, imagen } = req.body
    if (precio < 0) return res.send('El precio no puede ser negativo')
    if (stock < 0) return res.send('El stock no puede ser negativo')
    db.run('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ? WHERE id = ?', [nombre, descripcion, precio, stock, imagen, id], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/productos')
    })
}

const eliminarProducto = (req, res) => {
    const { id } = req.params
    db.run('DELETE FROM productos WHERE id = ?', [id], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/productos')
    })
}

module.exports = { listarProductos, verProducto, mostrarFormCrear, crearProducto, mostrarFormEditar, editarProducto, eliminarProducto }