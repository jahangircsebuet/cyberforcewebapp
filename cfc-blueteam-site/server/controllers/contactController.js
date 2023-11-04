const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');
const db = require('../models');
const UserData = db.userData;
const sendEmail = require('../utils/email');
const ftp = require('basic-ftp');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, 'config.env') });

// create new contact form data 
exports.userData = catchAsync(async (req, res, next) => {
  const { fullname, email, phonenumber, message, file } = req.body;
  const newContact = await UserData.create({
    name: fullname,
    email,
    phoneNumber: phonenumber,
    message,
    file,
  });
  var phone = eval("phone = (" + req.body.phonenumber + ")");
  res.status(200).json({
    status: 'success',
    message: 'User data recieved successfully ' + phone,
    newContact,
  });
});

// upload file from contact form 
exports.fileUpload = catchAsync(async (req, res, next) => {
  const file = req.file;
  const fileName = req.file.originalname;
  const uploadDir = path.join(__dirname, '..', 'uploads');
  console.log("uploadDir: " + uploadDir);
  const filePath = path.join(uploadDir, fileName);

  fs.writeFile(filePath, file.buffer, (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to save the file.',
      });
    }
  });

  newContact = JSON.parse(req.body.newContact);

  // sendEmail({
  //   email: newContact.email,
  //   subject: 'Contact Form Submission',
  //   fileName,
  //   filePath,
  //   message: `
  //   Contact Information:\n
  //   Name: ${newContact.name}

  //   Email: ${newContact.email}

  //   Phone Number: ${newContact.phoneNumber}

  //   Message: ${newContact.message}\n`,
  // });

  // check if submitted contact found or not
  const contactData = await UserData.findOne({ where: { name: newContact.name, email: newContact.email,  phoneNumber: newContact.phoneNumber} });
  if (contactData === null) {
    res.status(200).json({
      status: 'failed',
      message:
        'No matching contact data found!',
    });
  } else {
    contactData.file =  "http://10.0.139.142/static/" + fileName;
    await contactData.save();
  }

  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
    });
    await client.uploadFrom(filePath, fileName);
  } catch (err) {
    console.log('ftp error\n', err);
  }
  client.close();

  res.status(200).json({
    status: 'success',
    // result,
    message:
      'Thank you for contacting us! We have received your message and will get back to you shortly.',
  });
});

exports.getFiles = catchAsync(async (req, res, next) =>{
  try {
    const filename = path.join(__dirname + req.body.filename);
    const fileStream = fs.createReadStream(filename);
    fileStream.on('error', (error) => {
      console.error('Error reading file:', error);
      res.status(404).send('File not found');
    });
    fileStream.pipe(res);
  } catch (err) {
    console.error('Error handling file request:', error);
    res.status(500).send('Internal Server Error');
  }
});

exports.ftpUpload = catchAsync(async (req, res, next) => {
  const file = req.file;
  const fileName = req.file.originalname;
  const uploadDir = path.join(__dirname, '..', 'uploads');
  console.log(uploadDir);
  const filePath = path.join(uploadDir, fileName);

  fs.writeFile(filePath, file.buffer, (err) => {
    if (err) {
      // Handle error if the file couldn't be saved
      console.error('Error saving file:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to save the file.',
      });
    }
  });

  console.log('this is the file\n', file);
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
    });
    await client.uploadFrom(filePath, fileName);
  } catch (err) {
    console.log('ftp error\n', err);
  }
  client.close();

  res.status(200).json({
    status: 'success',
    message:
      'Thank you for contacting us! We have received your message and will get back to you shortly.',
  });
});

function getAppRootDir () {
  let currentDir = __dirname
  while(!fs.existsSync(path.join(currentDir, 'package.json'))) {
    currentDir = path.join(currentDir, '..')
  }
  return currentDir
}

const multer = require('multer');
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, "uploads") 
  }, 
  filename: function (req, file, cb) { 
    let s = file.originalname.split('.');
    cb(null, file.fieldname + "-" + Date.now()+'.'+s[s.length-1]) 
  } 
}) 

const upload = multer({  
  storage: storage
  // limits: { fileSize: maxSize }
  // fileFilter: function (req, file, cb){ 
  
  //     // Set the filetypes, it is optional 
  //     var filetypes = /jpeg|jpg|png/; 
  //     var mimetype = filetypes.test(file.mimetype); 

  //     var extname = filetypes.test(path.extname( 
  //                 file.originalname).toLowerCase()); 
      
  //     if (mimetype && extname) { 
  //         return cb(null, true); 
  //     } 
    
  //     cb("Error: File upload only supports the "
  //             + "following filetypes - " + filetypes); 
  //   }  

// mypic is the name of file attribute 
}).single("file");

exports.uploadFile = catchAsync(async (req, res, next) => {
  // file upload revised start 
// const router = express.Router();

// const maxSize = 1 * 1000 * 1000; 

// let newContact = JSON.parse(req.body.newContact);
// console.log("req.body.file.originalFilename: " + req.body.file.originalFilename);

//   // check if submitted contact found or not
//   const contactData = await UserData.findOne({ where: { name: newContact.name, email: newContact.email,  phoneNumber: newContact.phoneNumber} });
//   if (contactData === null) {
//     res.status(200).json({
//       status: 'failed',
//       message:
//         'No matching contact data found!',
//     });
//   } else {
//     contactData.file =  "http://10.0.139.142/static/" + 'fileName';
//     await contactData.save();
//   }

// Error MiddleWare for multer file upload, so if any 
  // error occurs, the image would not be uploaded! 
  upload(req,res,function(err) { 

      if(err) { 

          // ERROR occurred (here it can be occurred due 
          // to uploading image of size greater than 
          // 1MB or uploading different file type) 
          res.send(err) 
      } 
      else { 

          // SUCCESS, image successfully uploaded 
          res.send("Success, Image uploaded!") 
      } 
  }) 

// file upload revised end
});
exports.retrieveFile = catchAsync(async (req, res, next) =>{
  try {
    // const filename = path.join(__dirname + req.body.filename);
    const rootDir = getAppRootDir();
    const filename = path.join(rootDir + '/uploads/' +  req.body.filename);
    console.log("filename: " + filename);
    
    const fileStream = fs.createReadStream(filename);
    fileStream.on('error', (error) => {
      console.error('Error reading file:', error);
      res.status(404).send('File not found');
    });
    fileStream.pipe(res);
  } catch (err) {
    console.error('Error handling file request:', error);
    res.status(500).send('Internal Server Error');
  }
});

