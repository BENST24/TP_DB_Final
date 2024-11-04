const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const dbType = process.env.DB_TYPE || 'mongo';

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('../frontend'));


if (dbType === 'mongo') {
    mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Conectado a MongoDB'))
        .catch(err => console.error('Error al conectar a MongoDB', err));
} else if (dbType === 'mysql') {
    const db = mysql.createPool({
        host: 'localhost',
        user: 'todolist',
        password: 'todolist',
        database: 'todolist'
    });

    app.use((req, res, next) => {
        req.db = db;
        next();
    });
}

app.use('/api', todoRoutes);
// Redireccionar a index.html si se accede a la raíz
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../frontend/index.html');
});


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
