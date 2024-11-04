const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware -> save feature par chalana hai and hamesha ye sab cheezein module.exports/model creation se pehle likho 
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC" ,doc);

        //transporter create karo
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure:true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from:`Kavish`,
            to: doc.email,
            subject:"New File Uploaded aa gayi mere paas",
            html:`<h2>Hi mere bhai</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}>${doc.imageUrl}</a> </p>`,
        })

        console.log("INFO",info);
    }
    catch(error){
        console.log(error);
    }
})

const File = mongoose.model("File" , fileSchema);
module.exports = File;