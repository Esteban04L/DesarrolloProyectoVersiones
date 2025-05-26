-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS artventory_db;
USE artventory_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Usuario por defecto
INSERT INTO usuarios (username, password) VALUES ('admin', '1234');

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Categorías de ejemplo
INSERT INTO categorias (nombre) VALUES
('Decoración'), ('Accesorios'), ('Textiles'), ('Joyería'), ('Otros');

-- Tabla de proveedores
CREATE TABLE IF NOT EXISTS proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    direccion TEXT
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria_id INT,
    proveedor_id INT,
    cantidad INT NOT NULL DEFAULT 0,
    precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    estado ENUM('disponible', 'agotado', 'reservado') DEFAULT 'disponible',
    imagen VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

