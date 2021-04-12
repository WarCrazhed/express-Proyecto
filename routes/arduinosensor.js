var express = require('express');
var router = express.Router();

const mongoose = require ('mongoose');
const ArduinoSensor = mongoose.model('ArduinoSensor');
const {check, validationResult} = require('express-validator');

const SerialPort = require ('serialport');

var arduinoPort = 'COM4';
const Readline = SerialPort.parsers.Readline;

var arduinoSerialPort = new SerialPort(arduinoPort,
    {baudRate: 9600},
    function(err){
    if (err){
        return console.log('Error: ', err.message)
    }
});

const parser = arduinoSerialPort.pipe(new Readline({
    delimiter: '\r\n'
}));

let valorDistancia="";
//rutas del metodo http
router.get('/',async(req,res)=>{
    res.send({valorDistancia});
});
router.post('/',async(req,res)=>{
    let cod=await ArduinoSensor.find().count()+1;
    var distancia = new ArduinoSensor({
        codigo: cod,
        distancia: valorDistancia
    });
    await distancia.save();
    res.status(201).send(distancia);
});

//apertura del puerto COM4
parser.on('open',function(err){
    if(err){
        return console.log(err);
    }
    console.log();
});

parser.on('data', function(data,err){
    if (err){
        return console.log(err);
    }
    console.log("valor: "+ data);
    valorDistancia = data.toString('utf8');
});

arduinoSerialPort.on('error',function(err){
    if (err){
        return console.log(err);
    }
});

module.exports = router;