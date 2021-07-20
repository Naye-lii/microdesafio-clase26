var express = require('express');
var router = express.Router();
const{ body, validationResult } = require('express-validator');

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
        res.render("mensaje", {info, colorFondo});
  }
  else{
    
    res.render('formulario', { errors: errors.mapped() });
  }
});


module.exports = router;
