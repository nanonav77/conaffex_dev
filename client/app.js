const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/express/index.html'));
  //Direccion por defecto que debe utilizar al aplicación/sitio web.
});

router.get('/addcolaborador',function(req,res){
  res.sendFile(path.join(__dirname+'/express/add_colaborador.html'));
  //Direccion a la página de agregar colaborador.
});

router.get('/udpdatecolaborador',function(req,res){
  res.sendFile(path.join(__dirname+'/express/modificar_colaborador.html'));
  //Direccion a la página de modificar colaborador.
});

router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/express/about.html'));
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//add the router
app.use('/', router);
app.use(express.static(path.join(__dirname, "express")))
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');