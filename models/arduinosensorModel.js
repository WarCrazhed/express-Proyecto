const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

const ArduinoSensorSchema= new mongoose.Schema({
    codigo:{
        type: Number,
        required: true,
        unique: true,
    },
    distancia:{
        type: String, 
        required: true,
    },
    fecha_reg:{
        type:Date,
        default: Date.now
    }
});

mongoose.model('ArduinoSensor',ArduinoSensorSchema);