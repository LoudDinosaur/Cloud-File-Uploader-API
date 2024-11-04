const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload -> handler Function

exports.localFileUpload = async(req,res) => {
    try{

        //fetch file from request
        const file = req.files.file;
        console.log("File aagyi bhai ->", file);

        //kis path par load krtna chahte ho on server
        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path);

        //file move krni hai toh -> move waala function bhi bahut important hai
        //add path to the move function
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Added Successfully'
        })
   }
    catch(error){
        console.log(error);
    }
}

//check here ki jis type ki file aayi hai kya woh supporrted hai with array of files in supportedType array
function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder ,quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto"; //khud pata laga lo ki resource type kya hai
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//imageUpload handler
exports.imageUpload = async (req,res) => {
    try{
        //data fetch
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FileType:", fileType);

        if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // else file format supported hai
        console.log("Uploaded on Cloudinary");
        const response = await uploadFileToCloudinary(file, "Project");
        console.log(response);

        //Db mein entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:  response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
        
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong',
        });
    }
}

//videoUpload handler
exports.videoUpload = async(req,res) => {
    try{
        //data fetch
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;

         //Validation
         const supportedTypes = ["mp4","mov"];
         const fileType = file.name.split('.')[1].toLowerCase();
         console.log("FileType:", fileType);
 
         //TODO : add upper limit of 5MB
         if(!isFileTypeSupported(fileType , supportedTypes)){
             return res.status(400).json({
                 success:false,
                 message:'File format not supported',
             })
         }

          // else file format supported hai
        console.log("Uploaded on Cloudinary");
        const response = await uploadFileToCloudinary(file, "Project");
        console.log(response);

        //Db mein entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:  response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video Successfully Uploaded',
        })

    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Something Went Wrong'
        })
    }
}

//imageSizeReducer Handler
exports.imageSizeReducer = async(req,res) => {
    try{
        //data fetch
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FileType:", fileType);

        if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // else file format supported hai
        console.log("Uploaded on Cloudinary");
        const response = await uploadFileToCloudinary(file, "Project" , 30);
        console.log(response);

        //Db mein entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:  response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Something Went Wrong'
        })
    }
}