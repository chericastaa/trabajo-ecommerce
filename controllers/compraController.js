const db = require('../models/database')

const listarCompras = (req, res) => {
    const user_id = 1
    db.all('SELECT compras.*, users.nombre as usuario FROM compras INNER JOIN users ON compras.user_id = users.id WHERE compras.user_id = ?', [user_id], (err, compras) => {
        if (err) return res.send(err.message)
        res.render('compras/index', { compras })
    })
}

const verCompra = (req, res) => {
    const { id } = req.params
    db.get('SELECT compras.*, users.nombre as usuario FROM compras INNER JOIN users ON compras.user_id = users.id WHERE compras.id = ?', [id], (err, compra) => {
        if (err) return res.send(err.message)
        db.all('SELECT detalle_compra.*, productos.nombre FROM detalle_compra INNER JOIN productos ON detalle_compra.producto_id = productos.id WHERE detalle_compra.compra_id = ?', [id], (err, detalles) => {
            if (err) return res.send(err.message)
            res.render('compras/ver', { compra, detalles })
        })
    })
}

module.exports = { listarCompras, verCompra }