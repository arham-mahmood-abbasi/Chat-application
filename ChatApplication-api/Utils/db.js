const mongoose = require('mongoose');
mongoose.set('strictQuery',true);

// chatapp is the data base name
mongoose.connect('mongodb+srv://arhamabbasi915:5BiAa0jAal3yzciF@cluster0.ynvjtjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser : true,
    // useUnifiedTopology:true,
});
const db = mongoose.connection;
db.on("error", (err)=>{
    console.log('failed to connect')  //if error occurs then this will be printed on the console
});
db.once('open',()=>{
    console.log('connected successfully!')   /// if connection is successful it will print connected successfully! in the terminal
});