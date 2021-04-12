var express = require('express');
var router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const mongoose = require ('mongoose');
const { response } = require('express');
const Usuarios = mongoose.model('Usuario');
const Cliente = mongoose.model('Cliente');
const Empleado = mongoose.model('Empleado');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  await Usuarios.find((err,usuarios)=>{
if(err){return res.send(err);}
res.send(usuarios);
  });
  //res.send('Hola mundo 5ab');
});

router.get('/:nombre',[],async (req,res)=>{

  usuario= await Usuarios.findOne({nombre: req.params.nombre});

  if (!usuario){
    return res.status(400).send("Usuario No encontrado")
  }
  res.send(usuario);
});

router.post('/',[
  check('nombre').isLength({min:3}),
  check('email').isEmail(),
  check('password').isLength({min:5})
], async (req,res)=>{
  const errores = validationResult(req);
  if(!errores.isEmpty()){
return res.status(422).json({errores: errores.array()});
  }

  const salt = await bcrypt.genSalt(10);
  const passCifrado = await bcrypt.hash(req.body.password,salt);

  //codigo_sig = Usuarios.find().sort({codigo: -1}).limit(1);

  usuario=new Usuarios({
    nombre:   req.body.nombre,
    email:    req.body.email,
    password: passCifrado,
    role:     req.body.role
  });

  await usuario.save();
  res.status(201).send(usuario);

});

router.post ('/iniciosesion',[
  check ('email').isEmail(),
  check('password').isLength({min:5})
], async (req,res)=>{
  const errores = validationResult(req);
  if (!errores.isEmpty()){
    return res.status(422).json({errores:errores.array()})
  }
  usuario = await Usuarios.findOne({email: req.body.email})

  if(!usuario){
    return res.status(400).send("Usuario o contraseña incorrectos");
  }
  validaPass = await bcrypt.compare(req.body.password,usuario.password);

  if (!validaPass){
    return res.status(400).send("Usuario o contraseña incorrectos");
  }
  jwtoken= usuario.generadorJWT();
  //res.send("Bienvenido");
  res.json(jwtoken);
});

router.put('', [
check('nombre').isLength({min:3}),
check('email').isEmail(),
check('password').isLength({min:5})
], async (req,res)=>{
const errores = validationResult(req);
if(!errores.isEmpty()){
return res.status(422).json({errores: errores.array()});
}

const usuario = await Usuarios.findOne({uid: req.body.uid});
if(!usuario){
return res.status(400).send("Usuario no encontrado");
}
const salt = await bcrypt.genSalt (10);
const passCifrado = await bcrypt.hash(req.body.password,salt);

usuario_mod = await Usuarios.findOneAndUpdate(
  {uid:req.body.uid},//A quién vas a modificar
  //qué vas a modificar
  {
    nombre:   req.body.nombre,
    email:    req.body.email,
    password: passCifrado
  },
  //tipo de respuesta
  {
    new:true
  }
);
res.status(200).send(usuario_mod);
});

router.delete('/:uid',[],async (req,res)=>{
  const usuario = await Usuarios.findOne ({uid: req.params.uid});
  if (!usuario){
    return res.status (400).send("Usuario no encontrado");
  }

usuario_eliminado = await Usuarios.findOneAndDelete({uid: req.params.uid})

res.send (usuario_eliminado);
});

module.exports = router;
