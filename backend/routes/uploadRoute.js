//const path = require('path')

const express = require('express')
const multer = require('multer')
const router = express.Router()


const admin = require('firebase-admin')
var serviceAccount = require("../nodefirebaseee-guide-firebase-adminsdk-2shsi-f2157cd60c.json");

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  storageBucket:"gs://nodefirebaseee-guide.appspot.com/"
})

const mu = multer({
  storage:multer.memoryStorage(),
  limits:{
    fileSize: 6 * 1024 * 1024
  }
})

const bucket = admin.storage().bucket()


router.post("/", mu.single("image"), async (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();
  blobStream.on("error", (err) => {
    next(err);
  });

  blobStream.on("finish", () => {
    const file = bucket.file(req.file.originalname)
    
    file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      })
      .then((signedUrls) => {
        // signedUrls[0] contains the file's public URL
        res.status(200).send(signedUrls[0])
        console.log(signedUrls[0]);
      });
  })
  blobStream.end(req.file.buffer);
})

/*
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})
*/
module.exports = router