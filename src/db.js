const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/admin",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Conexao com mongo realizada com sucesso");
}).catch((error)=>{
    console.log("Erro na conexao com o mongo"+error);
});