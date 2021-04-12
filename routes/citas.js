//estructura basica
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

//constante para conectar con mongoose 
const mongoose = require('mongoose');
//toda la informacion viene del modelo que depende de la ruta
//constante para la variable producto
const Citas = mongoose.model('Cita');
/* GET users listing./para consulta de todo se necesita ruta raiz */
router.get('/', async function(req, res, next) {
    //con async se hacen las peticiones desde express hasta bd y lleva la palabra await que es palabra de espera para la busqueda
    await Citas.find((err, cita) => {
        if (err) { return res.send(err); }
        res.send(cita);

    });

});

//configurar metodo get
//funcion anonima, no tienen funcion pero ejecutan informacion
/*router.get('/', function(req, res, next) {
    res.send("Lista de Productos");
    //send--envio de informacion
    //render--visualizar en pantalla la informacion 
});
//funcion anonima
router.get('/manzana', (req, rest) => {
    rest.send("Una manzana")

});*/
//metodo insertar /se necesita ruta raiz
//informacon para ver que se ejecuta
router.post('/', [
    //longitud de la informacion de la variable
    //check('codigo').isLength({ min: 1 }),
    check('fecha').isLength({ min: 3 }),
    check('hora').isLength({ min: 3 }),
    check('servicio').isLength({ min: 1 }),
    check('observaciones').isLength({ min: 1 }),
], async(req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(422).json({ errores: errores.array() });
    }



    const salt = await bcrypt.genSalt(10);
    //const passCifrado = await bcrypt.hash(req.body.password, salt);

    _id_sig = Citas.find().sort({ _id: -1 }).limit(1) + 1;


    cita = new Citas({
        fecha: req.body.fecha,
        hora: req.body.hora,
        servicio: req.body.servicio,
        observaciones: req.body.observaciones
    });

    await cita.save();
    res.status(201).send(cita);

});

//modificar /se necesita ruta raiz 
router.put('/', [
    check('fecha').isLength({ min: 3 }),
    check('hora').isLength({ min: 3 }),
    check('servicio').isLength({ min: 1 }),
    check('observaciones').isLength({ min: 1 }),
], async(req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(422).json({ errores: errores.array() });
    }

    const cita = await Citas.findOne({ _id: req.body._id });
    if (!cita) {
        return res.status(400).send("Cita no encontrado");
    }

    const salt = await bcrypt.genSalt(10);
    //const passCifrado = await bcrypt.hash(req.body.password, salt);

    cita_mod = await Citas.findOneAndUpdate(
        //aquien se va a modificar
        { _id: req.body._id },
        //que se va a modificar
        {
            fecha: req.body.fecha,
            hora: req.body.hora,
            servicio: req.body.servicio,
            observaciones: req.body.observaciones

        },
        //como se requiere la informacion que se regresará
        {
            new: true
        }
    );
    //metodo modificar
    res.status(200).send(cita_mod);

});
//metodo eleiminar/ se necesita la ruta raiz y un valor any
router.delete('/:_id', [], async(req, res) => {
    //primero se realiza la busqueda
    const cita = await Citas.findOne({ _id: req.params._id });

    if (!cita) {
        return res.status(400).send("Cita no encontrado");

    }
    cita_eliminado = await Citas.findOneAndDelete({ _id: req.params._id });
    res.send(cita_eliminado);

});
//metodo consulta se va a validar que llegue la informacion dentro de corchetes, sera una funcion acincrona "async" simple
router.get('/:_id', [], async(req, res) => {
    //hacer consulta
    cita = await Citas.findOne({ _id: req._id });
    //con el if se comprobara si existe usuario
    if (!cita) {
        return res.status(400).send("Cita no encontrado");

    }
    res.send(cita);


});


//exportacion de modulos
module.exports = router;