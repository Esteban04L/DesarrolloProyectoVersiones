-- Crear la base de datos (si no está creada aún)
CREATE DATABASE IF NOT EXISTS country_art;
USE country_art;

-- Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    cli_codigo VARCHAR(20) UNIQUE NOT NULL,
    cli_nombre VARCHAR(100) NOT NULL,
    cli_correo VARCHAR(100),
    cli_telefono VARCHAR(20),
    cli_direccion TEXT
);

-- Tabla de Proveedores
CREATE TABLE IF NOT EXISTS proveedores (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    prov_codigo VARCHAR(20) UNIQUE NOT NULL,
    prov_nombre VARCHAR(100) NOT NULL,
    prov_correo VARCHAR(100),
    prov_telefono VARCHAR(20),
    prov_direccion TEXT
);

-- Tabla de Empleados
CREATE TABLE IF NOT EXISTS empleados (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    emp_codigo VARCHAR(20) UNIQUE NOT NULL,
    emp_nombre VARCHAR(100) NOT NULL,
    emp_correo VARCHAR(100),
    emp_telefono VARCHAR(20),
    emp_puesto VARCHAR(50),
    emp_fecha_ingreso DATE
);

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    pro_codigo VARCHAR(20) UNIQUE NOT NULL,
    pro_nombre VARCHAR(100) NOT NULL,
    pro_precio DECIMAL(10,2) NOT NULL,
    pro_stock INT NOT NULL,
    pro_imagen LONGBLOB
    -- Si se puede modificar en el futuro:
    -- , prov_codigo VARCHAR(20),
    -- FOREIGN KEY (prov_codigo) REFERENCES proveedores(prov_codigo) ON DELETE SET NULL
);

-- Tabla de Facturas (ahora con código de empleado)
CREATE TABLE IF NOT EXISTS facturas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    id_fac VARCHAR(20) UNIQUE NOT NULL,
    cli_codigo VARCHAR(20) NOT NULL,
    emp_codigo VARCHAR(20), -- empleado que hizo la factura
    fac_fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fac_subtotal DECIMAL(10,2) NOT NULL,
    fac_iva DECIMAL(10,2) NOT NULL,
    fac_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cli_codigo) REFERENCES clientes(cli_codigo) ON DELETE CASCADE,
    FOREIGN KEY (emp_codigo) REFERENCES empleados(emp_codigo) ON DELETE SET NULL
);

-- Tabla productos por factura (proxfac)
CREATE TABLE IF NOT EXISTS proxfac (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    id_fac VARCHAR(20) NOT NULL,
    id_pro VARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_fac) REFERENCES facturas(id_fac) ON DELETE CASCADE,
    FOREIGN KEY (id_pro) REFERENCES productos(pro_codigo) ON DELETE CASCADE
);

-- Agregar columna para la relación en productos
ALTER TABLE productos
ADD COLUMN prov_codigo VARCHAR(20),
ADD CONSTRAINT fk_productos_proveedores
    FOREIGN KEY (prov_codigo) REFERENCES proveedores(prov_codigo)
    ON DELETE SET NULL;


