require('dotenv').config()
const mongoose = require('mongoose');
const Document = require('./models/Document');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected');
})
.catch((err)=>{
    console.log(err);
})

const io = require("socket.io")(process.env.PORT,{
    cors:{
        origin:process.env.CLIENT_URL,
        methods:["GET","POST"]
    }
})

const defaultValue = "";

io.on("connection",socket=>{
    socket.on('get-document',async documentId=>{
        const document = await doc(documentId);
        socket.join(documentId);
        socket.emit("load-document",document.data)
        socket.on("send-changes",delta => {
            socket.broadcast.to(documentId).emit("recieve-changes",delta);
        })

        socket.on("save-document",async data=>{
            await Document.findByIdAndUpdate(documentId,{data})
        })
    })
})

async function doc(id){
   if(id == null) return;

   const document = await Document.findById(id);
   if(document) return document;
   return await Document.create({_id:id,data:defaultValue})
}