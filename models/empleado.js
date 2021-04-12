const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

const EmpleadoSchema=new mongoose.Schema({
    codigo: Number,
    nombre: String,
    email:  String,
    rol:{
        nombre:String,
        sueldo:Number,
    }
});

mongoose.model('Empleado',EmpleadoSchema);