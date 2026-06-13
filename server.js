// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const puerto = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura conexión a MySQL
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root', // usuario de XAMPP por defecto
    password: '', // contraseña vacía en XAMPP por defecto
    database: 'formulariocl'
});

// Conecta a la base de datos
conexion.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos.');
    }
});

// Ruta para recibir datos del formulario
app.post('/enviar', (req, res) => {
    const { nombre, email, mensaje } = req.body;
    
    const sql = 'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)';
    conexion.query(sql, [nombre, email, mensaje], (error, resultados) => {
        if (error) {
            console.error('Error al guardar los datos:', error);
            res.status(500).send('Error en el servidor.');
        } else {
            console.log('Datos guardados correctamente.');
            res.status(200).send('Datos recibidos y guardados.');
        }
    });
});

// Arranca el servidor
app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
