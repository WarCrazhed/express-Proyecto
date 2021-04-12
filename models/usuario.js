const mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');
mongoose.set('useCreateIndex',true);

const UsuarioSchema = new mongoose.Schema({

    nombre:{ 
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: String,
        default: 'user_role'
    }
});

UsuarioSchema.methods.generadorJWT = function(){
    return jwt.sign({
        nombre : this.nombre,
        email: this.email,
    }, 'c0ntr4s3n14');
}

mongoose.model('Usuario',UsuarioSchema);
