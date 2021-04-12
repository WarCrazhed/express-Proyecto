const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);

const ClienteSchema=new mongoose.Schema({
    codigo: Number,
    nombre: String,
    email:  String,
});

mongoose.model('Cliente',ClienteSchema);