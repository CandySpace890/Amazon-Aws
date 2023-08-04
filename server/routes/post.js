const express = require("express");
const Post = require("../models/post"); //accesses functions in user model file
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require("multer");
const storage=multer.memoryStorage();
const uploads=multer({storage:storage});
router

  .post("/upload",uploads.single("file"), (req, res) => {
    try {
    const userid = req.userid;
      console.log("Email1 ",req.body.email1)
      console.log("Email1 ",req.body.email2)
      console.log("Email1 ",req.body.email3)
      console.log("Email1 ",req.body.email4)
      console.log("Email1 ",req.body.email5)

      console.log("Request files",req.body,req.file)
      uploadFile(req,res)
      console.log("daata received");

      res.json({ message: "File uploaded and emails sent successfully." });
    } catch (err) {
      console.error("Error uploading file:", err);
      res.status(500).json({ error: "Failed to upload file." });
    }
  });



const uploadFile = async (req, res) => {
  const s3 = new AWS.S3({
    accessKeyId: "AKIA4QZDMRRYEN3YIUQ2",
    secretAccessKey: "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",
  });

  const params = {
    Bucket: "sourcebucklab",
    Key: req.file.originalname,
    Body: req.file.buffer,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully", data.Location);
    if (data.Location !=""){

    const post = await Post.insertAttachment(req.body.userid,data.Location );
    await sendEmail(req,data.Location)
    console.log("Post received",post)
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: err.message });
  }
}

const sendEmail = async(req,link)=>{
  const email="manojreddyvirat18@gmail.com"

  const awsConfig={
    accessKeyId:"AKIA4QZDMRRYOIL3MAWB",
    secretAccessKey:"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",
    region:"us-east-1"
  }

  const SES = new AWS.SES(awsConfig)
  try{
     const params={
      Source:email,
      Destination: {
        ToAddresses: [
          req.body.email1
        ],
      },
      Message:{
        Subject:{
          Charset:"UTF-8",
          Data:`Upload Email`
        },
        Body:{
          Html:{
            Charset:"UTF-8",
            Data:`THe uploaded file link is ${link}`
          }
        }
      }
     };
     const emailSent=await SES.sendEmail(params).promise();
     console.log("Email sent success fully",emailSent)
  }catch(err){
    console.log("Error received from mail service",err)
  }
}

module.exports = router;
