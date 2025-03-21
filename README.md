# Nodepop

Nodepop es una aplicación web **SSR** construida con **Node.js**, **Express.js**, **EJS** y **MongoDB**, que permite la compra y venta de artículos de segunda mano.

---

## Descripción del proyecto

Nodepop es un servicio donde los usuarios pueden:
- Autenticarse usando su email y password
- Buscar productos filtrando por tags, precio y nombre.
- Ver solo sus propios productos.
- Crear y eliminar sus propios anuncios.
  
---

## Tecnologías utilizadas
- Node.js
- Express.js
- MongoDB / Mongoose
- EJS (SSR)
- Express-session
- bcrypt
- ESLint

---

## 🛠️ Requisitos previos

- Node.js (>= 18.x)
- npm
- MongoDB en local. Descargar de: https://www.mongodb.com/try/download/community

---

## Instalación paso a paso

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
### 3. Variables de entorno

- Renombra .env.example a .env

Por defecto tiene las siguientes constantes para conectar a base de datos, puerto y token para la sesion del usuario.

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/nodepop
PORT=3000
SESSION_SECRET="VvUc#Y9<BGCQ4+gt_zhMmA"
```

## Inicialización de la base de datos

- Si descargaste e instalaste MongoDB asegurate de que está el servicio corriendo.
    Entra en la consola dentro del proyecto y ejecuta:

```bash
npm run initDB
```

## Arrancar el servidor

```bash
npm start
```

o con nodemon

```bash
npm run dev
```


## Usuarios de prueba
- user1@example.com Contraseña: 1234
- user2@example.com Contraseña: 1234
