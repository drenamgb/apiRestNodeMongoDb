const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

require("./models/Artigo");
require ("./src/db");

const Artigo = mongoose.model("artigo");


app.get("/",function(req,res){
    return res.json({titulo:"como criar API com MONGODB"});
});

app.listen(process.env.PORT || 8082,()=>{
    console.log("servidor iniciado na porta 8082");
});

app.post("/create",(req,res)=>{
    
    const artigo = Artigo.create(req.body,(err)=>{
        if(err)return res.status(400).json({
            error:true,
            message:"Erro, nome não gravado"
        });
        
        return res.status(200).json({
            error:false,
            message:"nome gravado com sucesso"
        });
    });
//    return res.json({nome:req.body.nome});
});

app.get("/list",function(req,res){
   Artigo.find({}).then((artigo)=>{
       return res.json(artigo);
   }).catch((erro)=>{
      return res.status(400).json({
          error:true,
          message:"nenhum artigo encontrado"+erro
      }); 
   }); 
});

app.get("/select-id",function(req,res){
   Artigo.findOne({_id:req.body.id}).then(function(artigo){
       return res.json(artigo);
   }).catch(function(erro){
       return res.status(400).json({
           error:true,
           message:"ERRO: "+erro +" \n nenhum usuario com o id "+req.body.id
       });
   }) ;
});

app.delete("/delete-id",function(req,res){
    Artigo.deleteOne({_id:req.body.id}).then(function(){
        return res.json("deletado");
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"erro:" + erro.stack +"\n nao existe ususario com o ID "+req.body.id
        });
    });
});

app.put("/edit-id",function(req,res){
    
    Artigo.updateOne({_id:req.body.id},req.body).then(function(){
        return res.json("Atualizado");
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            messagem:"erro +"+ erro.stack+"\n usuario não encontrado"
        });
    });
});