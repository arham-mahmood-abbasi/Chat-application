const express = require('express');
require('./Utils/db')
const bodyparser = require('body-parser')
const app = express();
const authenticationRouter = require('./Routes/authenticationRoutes')
const fileUploadRoutes = require('./Routes/fileUploadRouter')
const PORT = 3005;

// Middle Ware
app.use(bodyparser.json());
app.use('/api',authenticationRouter);
app.use('/api',fileUploadRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})