const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretCode"));

const mongoose = require("mongoose");

const path = require("path"); 

const ExpressError = require("./expressError.js");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

let port = 8080;
app.listen(port,()=>{
    console.log("Listening App");
});

const chat = require("./models/chat.js");

function asyncWrap(fn)
{
    return function(req,res,next)
    {
        fn(req,res,next).catch((err)=>{next(err);});
    }
}

async function main()
{
    await mongoose.connect("mongodb://127.0.0.1:27017/dupwhatsapp");
}
main().then(()=>{
    console.log("Connection Established with Mongoose");
})
.catch((err)=>{
    console.log(err);
}); 

app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send("HOME PAGE");
});

//index

app.get("/chats",asyncWrap(async (req,res)=>{
    //await keyword can be used in async functions only, hence made arrow function async
        res.cookie("name","Pranav Divekar");
        res.cookie("name","Pranav Divekar",{signed:true});
        let data = await chat.find();
        res.render("index.ejs",{data});
   
}));
 
//new chat
app.get("/newchat",(req,res)=>{
    res.render("newchat.ejs");
});

app.post("/chats",asyncWrap(async (req,res,next)=>{
    //res.send("post working");
    let data = req.body;
    console.log(data);
   
    const chatnew = new chat({
        from:data.from,
        to:data.to,
        msg:data.msg,
        created_at:data.date
    });
    await chatnew.save();
    res.redirect("/chats");
}));
//sendind edit form
app.get("/chats/:id/edit",asyncWrap(async(req,res)=>{
    let {id} = req.params;
    let data = await chat.findById(id);
    res.render("edit.ejs",{data});
}));

//request received after edit submitted
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {newmsg} = req.body;
    let updatedchat = await chat.findByIdAndUpdate(id, {msg:newmsg});
    res.redirect("/chats");
});

app.delete("/chats/:id/delete",async(req,res)=>{
    let {id} = req.params;
    let deleted = await chat.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/chats");
});

app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
    console.log("request received");
    let {id} = req.params;
    let data = await chat.findById(id);
    if(!data){
        next(new ExpressError(404,"No chat found"));
    }
    res.render("edit.ejs",{data});
}));

app.use((err,req,res,next)=>{
    let {status=500,message="Page not found...!!!"}=err;
    res.status(status).send(message);
});