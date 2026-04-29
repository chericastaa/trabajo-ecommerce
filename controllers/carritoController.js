const db = require('../models/database')

const verCarrito = (req, res) => {
    const user_id = 1
    db.all('SELECT carrito.*, productos.nombre, productos.precio FROM carrito INNER JOIN productos ON carrito.producto_id = productos.id WHERE carrito.user_id = ?', [user_id], (err, items) => {
        if (err) return res.send(err.message)
        const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
        res.render('carrito/index', { items, total, user_id })
    })
}

const agregarAlCarrito = (req, res) => {
    const { producto_id, cantidad } = req.body
    const user_id = 1
    db.get('SELECT * FROM productos WHERE id = ?', [producto_id], (err, producto) => {
        if (err) return res.send(err.message)
        if (cantidad > producto.stock) return res.send('No hay suficiente stock')
        db.get('SELECT * FROM carrito WHERE user_id = ? AND producto_id = ?', [user_id, producto_id], (err, item) => {
            if (err) return res.send(err.message)
            if (item) {
                db.run('UPDATE carrito SET cantidad = cantidad + ? WHERE user_id = ? AND producto_id = ?', [cantidad, user_id, producto_id], (err) => {
                    if (err) return res.send(err.message)
                    res.redirect('/carrito')
                })
            } else {
                db.run('INSERT INTO carrito (user_id, producto_id, cantidad) VALUES (?, ?, ?)', [user_id, producto_id, cantidad], (err) => {
                    if (err) return res.send(err.message)
                    res.redirect('/carrito')
                })
            }
        })
    })
}

const eliminarDelCarrito = (req, res) => {
    const { id } = req.params
    db.run('DELETE FROM carrito WHERE id = ?', [id], (err) => {
        if (err) return res.send(err.message)
        res.redirect('/carrito')
    })
}

const confirmarCompra = (req, res) => {
    const user_id = 1
    db.all('SELECT carrito.*, productos.precio, productos.stock FROM carrito INNER JOIN productos ON carrito.producto_id = productos.id WHERE carrito.user_id = ?', [user_id], (err, items) => {
        if (err) return res.send(err.message)
        if (items.length === 0) return res.send('El carrito está vacío')
        const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
        const fecha = new Date().toLocaleString()
        db.run('INSERT INTO compras (user_id, fecha, total) VALUES (?, ?, ?)', [user_id, fecha, total], function (err) {
            if (err) return res.send(err.message)
            const compra_id = this.lastID
            items.forEach(item => {
                db.run('INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)', [compra_id, item.producto_id, item.cantidad, item.precio])
                db.run('UPDATE productos SET stock = stock - ? WHERE id = ?', [item.cantidad, item.producto_id])
            })
            db.run('DELETE FROM carrito WHERE user_id = ?', [user_id], (err) => {
                if (err) return res.send(err.message)
                res.redirect('/compras')
            })
        })
    })
}

module.exports = { verCarrito, agregarAlCarrito, eliminarDelCarrito, confirmarCompra }