//Just a file for Creating sample chats

const mongoose = require("mongoose");
async function main()
{
    await mongoose.connect("mongodb://127.0.0.1:27017/dupwhatsapp");
}
main()
.then(()=>{
    console.log("COnnection established init");
})
.catch((err)=>{
    console.log("Failed connection",err);
});
const chat = require("./models/chat.js");
let data = [
    {from:"Ashley",
    to:"Raju",
    msg:"2 is enough",
    created_at:new Date()
    },
    {from:"Prakash",
    to:"Pranav",
    msg:"Grind",
    created_at:new Date()
    },
    {from:"Raju",
    to:"Pranav",
    msg:"Work Hard",
    created_at:new Date()
    },
    {from:"Homeless",
    to:"Billionaire",
    msg:"Gimme Home",
    created_at:new Date()
    },
    {from:"Carry",
    to:"Jatin",
    msg:"Subscribe..!!!",
    created_at:new Date()
    }
]
chat.insertMany(data);
