const mongoose= require("mongoose");


mongoose.connect("mongodb://localhost/conangular",{ useUnifiedTopology: true , useNewUrlParser: true } )
.then((db)=> console.log("connected to database", db.connections[0].name))
.catch((err)=> console.log(err))

module.exports= mongoose;