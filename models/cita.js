const mongoose = require('mongoose');
//const jwt = require ('jsonwebtoken');
mongoose.set('useCreateIndex',true);

const CitaSchema = new mongoose.Schema({
    fecha:{ 
        type: Date,
        default:Date.now()
    },
    hora:{
        type: String,
        required: true,
    },
    servicio:{
        type: String,
        required: true,
    },
    observaciones:{
        type: String,
    }
});

mongoose.model('Cita',CitaSchema);