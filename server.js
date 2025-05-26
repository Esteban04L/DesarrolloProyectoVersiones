const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Sirve el index.html

// Ruta de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error en servidor');
        }

        if (result.length > 0) {
            res.send({ status: 'ok' });
        } else {
            res.send({ status: 'fail' });
        }
    });
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(Servidor corriendo en http://localhost:${PORT});
});
