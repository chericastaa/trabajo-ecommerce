const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log('Base de datos conectada')
    }
})

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT UNIQUE NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    rol_id INTEGER,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
)`)

    db.run(`CREATE TABLE IF NOT EXISTS permisos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT UNIQUE NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS rol_permiso (
        rol_id INTEGER,
        permiso_id INTEGER,
        PRIMARY KEY (rol_id, permiso_id)
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL NOT NULL,
    stock INTEGER NOT NULL,
    imagen TEXT
)`)
    db.run(`CREATE TABLE IF NOT EXISTS carrito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        producto_id INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (producto_id) REFERENCES productos(id)
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS compras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        fecha TEXT NOT NULL,
        total REAL NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS detalle_compra (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        compra_id INTEGER NOT NULL,
        producto_id INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        precio REAL NOT NULL,
        FOREIGN KEY (compra_id) REFERENCES compras(id),
        FOREIGN KEY (producto_id) REFERENCES productos(id)
    )`)
})

module.exports = db