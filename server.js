import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js"
import cors from "cors"

//App config
const App = express();
const Port = process.env.Port || 8001;
const connection_url = "mongodb+srv://admin:Fo35NVXRWUQi8Plt@cluster0.fxwnu.mongodb.net/tinderDB?retryWrites=true&w=majority"

// Middlewares
App.use(express.json());
App.use(cors());
App.use(function(req , res , next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin , X-Requested-With , Content-type , Accept");
    next();
})

// DB config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//API Endpnts
App.get("/" , (req , res) => res.status(200).send("Hello Coming back on NODE.JS!!!"));

    //Adding to database
App.post("/tinder/card" , (req , res) => {
    const dbCard = req.body;

    Cards.create(dbCard , (err , data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

    //Retreive Information
App.get("/tinder/card" , (req , res) => {
    Cards.find((err , data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});

// Listeners
App.listen(Port , () => console.log(`Listening to port no : ${Port}`));