const Storage = require('../storage'),
      express = require ('express')


var Router = express.Router()

  Router.get('/search', function(req, res){
    Storage.getData()
           .then(function(data){
             res.json({"error": false, "datos":data})
           })
           .catch(function(err){
             res.json({ "error": true, "datos": err });
           })
  });

  Router.get('/filteroptions', function(req, res){
    Storage.getData()
           .then(function(data){
             let ciudad = []
             let tipo = []
             data.forEach(function(key, idx){
               ciudad.push(key.Ciudad);
               tipo.push(key.Tipo);
             })
             res.json({"error": false, "ciudad": ciudad, "tipo": tipo})
           })
           .catch(function(err){
             res.json({ "error": true, "err": err });
           })
  })

Router.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', function(req, res){
  let params = req.params
  let datos = [];
  Storage.getData()
         .then(function(data){
           var arryAuxiliar = []
           var array1 = []
           var datos = []
           arryAuxiliar = data.slice()
           if (params.ciudadId == "todas") {
             array1 = arryAuxiliar
           }else {
             arryAuxiliar.forEach(function(key, idx){
               if(key.Ciudad == params.ciudadId){
                 array1.push(key);
               }
             })
           }
           arryAuxiliar = [];
           arryAuxiliar = array1
           array1 = [];

           if (params.tipoId == "todas") {
                array1 = arryAuxiliar
           } else {
             arryAuxiliar.forEach((key, idx) => {
                 if (key.Tipo == params.tipoId) { array1.push(key); }
             });
           }
           array1.forEach((key, idx) => {
               let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
               if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                   datos.push(key);
               }
           });
           res.status(200).json({ datos, params });
         })
         .catch((err) => {
             res.json({ "error": true, "err": err });
         });
})

module.exports = Router
