const express = require('express')
const session = require('express-session')
const db = require('./models/database')
const rolRoutes = require('./routes/rolRoutes')
const userRoutes = require('./routes/userRoutes')
const permisoRoutes = require('./routes/permisoRoutes')
const productoRoutes = require('./routes/productoRoutes')
const carritoRoutes = require('./routes/carritoRoutes')
const compraRoutes = require('./routes/compraRoutes')
const authRoutes = require('./routes/authRoutes')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
    secret: 'secreto123',
    resave: false,
    saveUninitialized: false
}))

app.use((req, res, next) => {
    res.locals.user = req.session.user || null
    next()
})

app.use('/auth', authRoutes)
app.use('/roles', rolRoutes)
app.use('/users', userRoutes)
app.use('/permisos', permisoRoutes)
app.use('/productos', productoRoutes)
app.use('/carrito', carritoRoutes)
app.use('/compras', compraRoutes)

app.get('/', (req, res) => {
    db.all('SELECT * FROM productos', [], (err, productos) => {
        if (err) return res.send(err.message)
        res.render('index', { productos })
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})