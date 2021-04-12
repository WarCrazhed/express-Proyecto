const mongoose = require('mongoose');
//const jwt = require ('jsonwebtoken');
mongoose.set('useCreateIndex',true);

const ProductoSchema = new mongoose.Schema({
    codigo:{type:Number,
    required:true,
    unique:true
    },
    nombre:{ 
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
    existencia:{
        type: Number,
        required: true,
    },
    precio:{
        type:Number,
        required:true,
    }
});

mongoose.model('Producto',ProductoSchema);