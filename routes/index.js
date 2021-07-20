var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
const{ body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { json } = require('express');

const pathUsuarios = path.join(__dirname, '../data/users.json');

const arrayValidation = [body('nombre')
.notEmpty().withMessage('Escribe un nombre').bail(),
body('edad')
.isInt().withMessage('Escribe una edad').bail(),
body('email')
.notEmpty().withMessage('Escribe un email').bail()
.isEmail().withMessage('No es un e-mail'),
body('color')
.notEmpty().withMessage('Escribe un email')
]

/* GET home page. */
router.get('/', function(req, res, next) {
  const colorFondo = req.session.color;
  res.render('index', { title: 'Express', colorFondo });
});

router.post('/', arrayValidation, function(req, res){
  const info = req.body;
  const errors = validationResult(req);


  if(errors.isEmpty()){
 
      let colorFondo = info.color;
     
      if(req.body.recordarColor !== undefined ){
        res.cookie('recordarColor', colorFondo, {maxAge:50000})
      }
      if(req.body.olvidarColor !== undefined ){
        colorFondo= 'white';
        res.clearCookie('recordarColor')
      }     
        req.session.color = colorFondo;
        //res.render("mensaje", {info, colorFondo});

        let password = req.body.password;
        password = bcrypt.hashSync(password, 10);

        let usuario = {
          nombre : req.body.nombre,
          password : password,
          email : req.body.email,
          edad : req.body.edad,
          colorFondo : colorFondo
        }

        
        const usuarios = JSON.parse(fs.readFileSync(pathUsuarios,'utf-8'));
        usuarios.push(usuario);
        
        //Cookie
        res.cookie('usuarioLog', usuario.email, {maxAge:50000});

        fs.writeFileSync(pathUsuarios, JSON.stringify(usuarios));
        res.render('mensaje', {info : usuario, colorFondo});
  }
  else{
    
    res.render('formulario', { errors: errors.mapped() });
  }
});


module.exports = router;
