const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'artventory',
  password: '12345678',
  port: 5432,
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/login', async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND contrasena = $2',
      [nombre_usuario, contrasena]
    );
    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/productos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'productos.html'));
});

app.get('/api/productos', async (req, res) => {
  const productos = await pool.query('SELECT * FROM productos');
  res.json(productos.rows);
});

app.post('/api/productos', upload.single('imagen'), async (req, res) => {
  const { nombre, categoria, cantidad, precio, descripcion } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;
  
  try {
    await pool.query(
      'INSERT INTO productos(nombre, categoria, cantidad, precio, descripcion, imagen) VALUES($1, $2, $3, $4, $5, $6)',
      [nombre, categoria, cantidad, precio, descripcion, imagen]
    );
    res.json({ success: true, message: 'Producto agregado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al agregar producto' });
  }
});

// Agregar middleware para servir archivos estáticos de uploads
app.use('/uploads', express.static('uploads'));

app.put('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, cantidad, precio, descripcion, imagen } = req.body;
  try {
    await pool.query(
      'UPDATE productos SET nombre=$1, categoria=$2, cantidad=$3, precio=$4, descripcion=$5, imagen=$6 WHERE id=$7',
      [nombre, categoria, cantidad, precio, descripcion, imagen, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get('/api/proveedores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM proveedores');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
});

// Agregar estas rutas al final del archivo, antes del app.listen

// Rutas para Proveedores
app.post('/api/proveedores', async (req, res) => {
  const { nombre, contacto, telefono, email, direccion } = req.body;
  try {
    await pool.query(
      'INSERT INTO proveedores(nombre, contacto, telefono, email, direccion) VALUES($1, $2, $3, $4, $5)',
      [nombre, contacto, telefono, email, direccion]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.put('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, telefono, email, direccion } = req.body;
  try {
    await pool.query(
      'UPDATE proveedores SET nombre=$1, contacto=$2, telefono=$3, email=$4, direccion=$5 WHERE id=$6',
      [nombre, contacto, telefono, email, direccion, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.delete('/api/proveedores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM proveedores WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});
