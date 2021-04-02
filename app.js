//jshint esversion:6
const express = require("express")
const ejs = require("ejs")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.use(bodyparser.urlencoded({
    extended:true
}))

app.use(express.static("public"))
app.set('view engine', 'ejs')

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true,useUnifiedTopology: true})

const userSchema = {
    email:String,
    password:String
}

const User = new mongoose.model("User",userSchema )

app.get("/",function(req,res){
    res.render("home")
})

app.get("/login",function(req,res){
    res.render("login")
})

app.get("/register",function(req,res){
    res.render("register")
})

app.post("/register", function(req,res){
    const newUser = new User({
        email:req.body.username,
        password:req.body.password
    })
    newUser.save(function(err){
        if(err) console.log(err);
        else {
            console.log("successfully added user");
            res.render("secrets")
        }
    })
})

app.post("/login",function(req,res){
    User.findOne({email:req.body.username,password:req.body.password},function(err,results){
        if(err) console.log(err);
        else{
            if(results){
                res.render("secrets")
            }
            else res.send("not found")
        }
    })
})


app.listen(3000,function(){
    console.log("server started on 3000");
})