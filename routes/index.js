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
      req.session.color = info.color;
      const colorFondo = req.session.color;
      res.render("mensaje", {info, colorFondo});
      
  }
  else{
    res.render('formulario', { errors: errors.mapped() });
  }
});

module.exports = router;
