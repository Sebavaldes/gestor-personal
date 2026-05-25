# Gestor Personal

Aplicación web full stack para gestionar tareas personales. Permite crear, listar, completar, filtrar y eliminar tareas.

## DEMO

https://gestor-personal-one.vercel.app/

## Tecnologías utilizadas

- React
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Render
- Vercel

## Funcionalidades

- Crear tareas
- Listar tareas
- Marcar tareas como completadas
- Filtrar tareas por estado
- Eliminar tareas
- Asignar prioridad a cada tarea

## Instalación

Clonar repositorio:

```bash
git clone https://github.com/Sebavaldes/gestor-personal
```

Entrar al proyecto:

```bash
cd gestor-personal
```

Instalar frontend:

```bash
npm install
```

Instalar backend:

```bash
cd backend
npm install
```

Crear archivo:

```txt
backend/.env
```

Agregar:

```env
MONGO_URI=tu_uri_mongodb
PORT=3000
```

Ejecutar backend:

```bash
node server.js
```

Volver al frontend:

```bash
cd ..
npm run dev
```

## Arquitectura

Frontend

```txt
src/
 ├── components
 ├── services
 └── App.jsx
```

Backend

```txt
backend/
 ├── controllers
 ├── routes
 ├── models
 └── server.js
```
