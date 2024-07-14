const express= require("express");
const app= express();
let port= 8080;
const path= require('path');
const mongoose= require("mongoose");
const chat= require("./models/chat.js");
const methodoverride= require("method-override");

app.use(methodoverride('_method'));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));  // to parse the req.body from post request.

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main().then(()=>{
    console.log("connection is successful");
}).catch((err)=>{
    console.log(err);
})
// let chats=[
//     {
//         from: "Narendra Prasath",
//         message: "Hi",
//         created_at: new Date(),
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM857vxeXQYytT6IGT7-I-u1Cg6peNjn_4mA&s"
//     },
//     {
//         from: "monisha",
//         message: "Hello everyone!!!",
//         created_at: new Date(),
//         image: "https://images.filmibeat.com/ph-big/2023/09/monisha-blessy_169441697320.jpg"
//     }
// ]
// chat.insertMany(chats);


// to get data from database it requires alot of time so we use await and make this callback function as async function to get data from database.
app.get("/chats", async(req,res)=>{
    let allchats= await chat.find()
    console.log(allchats)
    res.render("page.ejs",{allchats});
})

app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})

app.post("/chats", (req,res)=>{
    let{from, message, image}= req.body;    // urlencoded line is very important....
    chat.insertMany([
        {
            from: from,
            message: message,
            created_at: new Date(),
            image: image
        }
    ]);
    res.redirect("/chats");
})

app.get("/chats/:id/edit", async(req,res)=>{
    let {id}= req.params;
    let editchat= await chat.findById(id);
    res.render("edit.ejs", {editchat});
})
app.put("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let {message: newmsg}= req.body;
    let {image: newimg}= req.body;
    let updatedchat= await chat.findByIdAndUpdate(id, {message: newmsg}, {image: newimg});
    console.log(updatedchat);
    res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
    let {id}= req.params;
    let deletechat= await chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.listen(port, ()=>{
    console.log("listening to port 8080");
})