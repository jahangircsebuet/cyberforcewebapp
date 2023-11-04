const express = require('express');
// const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactRoutes');
const adminRouter = require('./routes/adminRoutes');
const app = express();
const authController = require('./controllers/authController');


const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// app.use(cors());

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) MAIN ROUTES
app.use('/api/contact-data', contactRouter);

app.use('/api/users', userRouter);

// TODO uncomment the below line to add API authentication 
// app.use('/api/admin', authController.protect, adminRouter);
// this is to check admin APIs without authentication 
app.use('/api/admin', adminRouter);

app.use(globalErrorHandler); // mostly unused

// file upload revised start const router = express.Router();

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, "uploads") 
  }, 
  filename: function (req, file, cb) { 
    let s = file.originalname.split('.');
    cb(null, file.fieldname + "-" + Date.now()+"."+s[s.length-1]); 
  } 
}) 

// //configure multer
// const upload = multer({
//   dest: 'uploads',
//   storage,
// });

const maxSize = 1 * 1000 * 1000; 
    
const upload = multer({  
    storage: storage, 
    // limits: { fileSize: maxSize }, 
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

app.post("/uploadFile",async function (req, res, next) { 

  newContact = JSON.parse(req.body.newContact);
  // check if submitted contact found or not
  const contactData = await UserData.findOne({ where: { name: newContact.name, email: newContact.email,  phoneNumber: newContact.phoneNumber} });
  if (contactData === null) {
    res.status(200).json({
      status: 'failed',
      message:
        'No matching contact data found!',
    });
  } else {
    contactData.file = req.file.filename;
    await contactData.save();
  }
        
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
}) 

// file upload revised end

// 4) START SERVER
module.exports = app;
