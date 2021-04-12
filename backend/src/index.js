const { urlencoded } = require("express");
const express= require("express");
const morgan= require("morgan");
const cors=require("cors");

const app= express();
require("./database");
const rutas= require("./routes/index")

app.use(cors());

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api", rutas);
app.listen(3000, ()=>
console.log("server on port", 3000));