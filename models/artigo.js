const mongoose = require("mongoose");

const Artigo = new mongoose.Schema({
    nome:{
        type:String
    }
});

mongoose.model("artigo",Artigo);
