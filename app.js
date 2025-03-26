const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const myRouter = require('./routes/myRouter');

// Defino el motor de plantillas a utilizar
app.set('view engine', 'ejs');
// Defino la localización de mis vistas
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
// Middleware para poder obtener data de los requests con BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Agrega esto para manejar formularios
// Configurando archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Agrego un enrutador compatible
app.use('/', myRouter);

module.exports = app;
