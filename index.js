//app create
const express = require("express");
const app = express();

//PORT find krna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//add middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));  //is middleware ka use krke hum server pr files upload krdenge

//db se connect krna hai
const db = require("./config/database");
db.connect();

//cloud se connect krna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount krna hai
const Upload = require("./routes/fileUpload");
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at${PORT}`);
})
