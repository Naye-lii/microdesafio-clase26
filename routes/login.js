const fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let usersJSON = fs.readFileSync('data/users.json', {"encoding":"utf-8"});
    let users = JSON.parse(usersJSON);
    let userLogged = req.cookies.usuarioLog;
    let user;

    if(userLogged != null){
        user = users.find(u => u.email == userLogged);
        res.render('mensaje', {info : user, colorFondo : user.colorFondo});
    }else{
        res.render('login');
    }
});

router.post('/', function(req, res){

})

module.exports = router;
