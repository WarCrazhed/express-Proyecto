var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors =require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Mario5126:Diploma2@cluster0.qox3d.mongodb.net/Proyecto?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology:true});
//listado de modelos (models)
require('./models/usuario');
require('./models/producto');
require('./models/cita');
require('./models/arduinosensorModel');
require('./models/cliente');
require('./models/empleado');
//listado de las rutas para manipular documentos
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var productosRouter = require('./routes/productos');
var citasRouter = require('./routes/citas');
var arduinosernsorRouter = require ('./routes/arduinosensor');
var clienteRouter = require('./routes/clientes');
var empleadoRouter = require('./routes/empleados');

var app = express();

//definir la url de la petición cruzada
app.use(cors({
  "origin":"http://localhost:4200",
  "methods":"GET,POST,PUT,DELETE",
  "preflightContinue":false,
  "optionsSuccessStatus": 204
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/citas', citasRouter);
app.use('/arduinosensor', arduinosernsorRouter);
app.use('/clientes', clienteRouter);
app.use('/empleados',empleadoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
