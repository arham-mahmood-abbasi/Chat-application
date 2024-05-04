const express = require('express');
require('./Utils/db')
const bodyParser = require('body-parser')
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(bodyParser.json()); // for JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:9001'
}));
const upload = multer({ dest: 'uploads/' });
const authenticationRouter = require('./Routes/authenticationRoutes')
const assignmentRouter = require('./Routes/assignmentRoute')
const fileUploadRoutes = require('./Routes/fileUploadRouter')(upload);
const classRouter = require('./Routes/classRoute')
const PORT = 3005;

// Middle Ware
app.use('/api',authenticationRouter);
app.use('/api',assignmentRouter)
app.use('/api',classRouter)
app.use('/api',fileUploadRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})