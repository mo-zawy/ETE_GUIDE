const express = require('express')
const multer = require('multer')
const router = express.Router()


const admin = require('firebase-admin')
const Product = require('../models/productModel')



const mu = multer({
  storage:multer.memoryStorage(),
  limits:{
    fileSize: 6 * 1024 * 1024
  }
})

const bucket = admin.storage().bucket()


router.post("/:id", mu.array("images",8), async (req, res, next) => {
    
    if (!req.files) {
        res.status(400).send("No file uploaded.");
        return;
    }
    
    const p = await Product.findById(req.params.id)
    if(p){
        req.files.forEach(a =>{
            const blob = bucket.file(a.originalname);
            const blobStream = blob.createWriteStream();
            blobStream.on("error", (err) => {
              next(err);
            });
            blobStream.on("finish",async () => {
                const file = bucket.file(a.originalname)
                file.getSignedUrl({
                    action: "read",
                    expires: "03-09-2491",
                  })
                  .then(async (signedUrls) => {
                    await Product.findOneAndUpdate({
                        _id:req.params.id
                    },{
                        $addToSet:{
                            images:signedUrls[0].toString()
                        }
                    })
                  
                  });
              })
              blobStream.end(a.buffer);    
        })
        res.json({'message':'uploaded'})
    }
    /*
    var images = []
    
  
  

  
  */
})

module.exports = router