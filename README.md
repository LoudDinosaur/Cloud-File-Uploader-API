# CloudUpload-API
CloudUpload-API is a RESTful service that allows users to upload images and videos to Cloudinary and receive email notifications with links to the uploaded media. Built with Express, Nodemailer, Cloudinary, and Mongoose, this API provides a seamless experience for media uploading and notification handling.

## Features

- Upload images and videos to Cloudinary
- Automatic email notifications with media links
- MongoDB Atlas for data storage
- Post middleware for sending emails after successful uploads

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Nodemailer**: A module for sending emails from Node.js applications with ease.
- **Cloudinary**: A cloud service for managing and delivering images and videos.
- **Mongoose**: An ODM library for MongoDB that simplifies data modeling and interactions.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file.
- **express-fileupload**: Middleware for handling file uploads in Express applications.

 **Base URL**: `http://localhost:4000/api/v1`

## API Endpoints

- **POST** `/localFileUpload`: Upload a local file.
- **POST** `/imageUpload`: Upload an image to Cloudinary.
- **POST** `/videoUpload`: Upload a video to Cloudinary.
- **POST** `/imageSizeReducer`: Reduce the size of an uploaded image.
  
## Usage

1. **Local File Upload**: Use the `/localFileUpload` endpoint to upload local files.
2. **Image Upload**: Send a POST request to `/imageUpload` with the image file to upload it to Cloudinary.
3. **Video Upload**: Send a POST request to `/videoUpload` with the video file to upload it to Cloudinary.
4. **Image Size Reduction**: Use the `/imageSizeReducer` endpoint to reduce the size of an uploaded image.


