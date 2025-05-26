const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Coloca tu contraseña si tienes
    database: 'artventory_db'
});

conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

module.exports = conexion;
