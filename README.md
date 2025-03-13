# 📦 Nodepop

Nodepop es una aplicación web **SSR** construida con **Node.js**, **Express.js**, **EJS** y **MongoDB**, que permite la compra y venta de artículos de segunda mano.

---

## 📝 Descripción del proyecto

Nodepop es un servicio donde los usuarios pueden:
- Publicar anuncios de productos de segunda mano.
- Buscar productos filtrando por tags, precio y nombre.
- Ver solo sus propios productos.
- Crear y eliminar sus propios anuncios.
  
---

## 🚀 Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB / Mongoose
- EJS (SSR)
- Express-session
- bcrypt
- ESLint
- Docker (opcional para MongoDB)

---

## 🛠️ Requisitos previos

- Node.js (>= 18.x)
- npm
- MongoDB en local o Docker

---

## ⚙️ Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/virgulilla/kc-nodejs.git
cd nodepop
npm install
```
### 2. Instalar dependencias

```bash
npm install
```
### 3. Variables de entorno (crea un .env)

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/nodepop
PORT=3000
```

## Inicialización de la base de datos

- Si tienes MongoDB instalado localmente

```bash
mongod --dbpath /ruta/a/tu/data/db
npm run initDB
```

- Si quieres usar Docker
```bash
docker run -d --name nodepop-mongo -p 27017:27017 mongo:6
npm run initDB
```

## Arrancar el servidor

```bash
npm start
```

## Usuarios de prueba
- user1@example.com Contraseña: 1234
- user2@example.com Contraseña: 1234

## Listar productos

Ruta GET /products

- Paginación con skip y limit
- Filtros:
    - tag → work, lifestyle, motor, mobile
    - price → Ejemplo 10-50, 10-, -50, 50
    - name → Busca productos cuyo nombre empiece por el valor

Ejemplo: 
```bash    
GET http://localhost:3000/products?tag=mobile&name=ip&price=50-&skip=0&limit=2&sort=price
```

## Crear producto
Ruta: POST /products

## Eliminar producto
Ruta: DELETE /products/:id