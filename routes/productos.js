//estructura basica
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

//constante para conectar con mongoose 
const mongoose = require('mongoose');
//toda la informacion viene del modelo que depende de la ruta
//constante para la variable producto
const Productos = mongoose.model('Producto');
/* GET users listing./para consulta de todo se necesita ruta raiz */
router.get('/', async function(req, res, next) {
    //con async se hacen las peticiones desde express hasta bd y lleva la palabra await que es palabra de espera para la busqueda
    await Productos.find((err, producto) => {
        if (err) { return res.send(err); }
        res.send(producto);

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
    check('nombre').isLength({ min: 3 }),
    check('descripcion').isLength({ min: 3 }),
    check('existencia').isLength({ min: 1 }),
    check('precio').isLength({ min: 1 }),
], async(req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(422).json({ errores: errores.array() });
    }



    const salt = await bcrypt.genSalt(10);
    //const passCifrado = await bcrypt.hash(req.body.password, salt);

    codigo_sig = Productos.find().sort({ codigo: -1 }).limit(1) + 1;


    producto = new Productos({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        existencia: req.body.existencia,
        precio: req.body.precio
    });

    await producto.save();
    res.status(201).send(producto);

});

//modificar /se necesita ruta raiz 
router.put('/', [
    check('codigo').isLength({ min: 1 }),
    check('nombre').isLength({ min: 3 }),
    check('descripcion').isLength({ min: 3 }),
    check('existencia').isLength({ min: 1 }),
    check('precio').isLength({ min: 1 }),
], async(req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(422).json({ errores: errores.array() });
    }

    const producto = await Productos.findOne({ codigo: req.body.codigo });
    if (!producto) {
        return res.status(400).send("Producto no encontrado");
    }

    const salt = await bcrypt.genSalt(10);
    //const passCifrado = await bcrypt.hash(req.body.password, salt);

    producto_mod = await Productos.findOneAndUpdate(
        //aquien se va a modificar
        { codigo: req.body.codigo },
        //que se va a modificar
        {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            existencia: req.body.existencia,
            precio: req.body.precio

        },
        //como se requiere la informacion que se regresará
        {
            new: true
        }
    );
    //metodo modificar
    res.status(200).send(producto_mod);

});
//metodo eleiminar/ se necesita la ruta raiz y un valor any
router.delete('/:codigo', [], async(req, res) => {
    //primero se realiza la busqueda
    const producto = await Productos.findOne({ codigo: req.params.codigo });

    if (!producto) {
        return res.status(400).send("Producto no encontrado");

    }
    producto_eliminado = await Productos.findOneAndDelete({ codigo: req.params.codigo });
    res.send(producto_eliminado);

});
//metodo consulta se va a validar que llegue la informacion dentro de corchetes, sera una funcion acincrona "async" simple
router.get('/:nombre', [], async(req, res) => {
    //hacer consulta
    producto = await Productos.findOne({ nombre: req.params.nombre });
    //con el if se comprobara si existe usuario
    if (!producto) {
        return res.status(400).send("Producto no encontrado");

    }
    res.send(producto);


});


//exportacion de modulos
module.exports = router;