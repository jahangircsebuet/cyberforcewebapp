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

// file upload revised start 
// const router = express.Router();
const multer = require('multer');
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, "uploads") 
  }, 
  filename: function (req, file, cb) { 
    cb(null, file.fieldname + "-" + Date.now()+".jpg") 
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
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }  
  
// mypic is the name of file attribute 
}).single("mypic");

app.post("/uploadProfilePicture",function (req, res, next) { 
        
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
