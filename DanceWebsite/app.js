const express=require('express');       //imports express module to interact with data submitted via html and streamline routing
const path=require('path');
let mongoose=require('mongoose');
let bodyparser=require('body-parser');  //body-parser is a middleware to help retrieve data from forms present in website and put into mongodb

//connect to mongo databse named 'ContactDance' on IP: local host
mongoose.connect('mongodb://localhost/ContactDance');

//DEFINE Mongoose Schema
let contactschema=new mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    address:String,
    desc:String
});
let Contact=mongoose.model('contact',contactschema);


const app=express();       //sets the express app
const port=8000;

app.use('/static',express.static('static'));    //serves static files when invoked inside '/static'
app.use(express.urlencoded());      //middleware function that parses incoming requests

app.set('view engine','pug');                   //sets the view engine to be pug
app.set('views',path.join(__dirname,'views'));  //sets the path to the directory to read template files from

//ENDPOINT
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
})
app.get('/about',(req,res)=>{
    res.status(200).render('about.pug');
})
app.post('/contact',(req,res)=>{
    let newdata=new Contact(req.body);
    newdata.save().then(()=>res.send("The data has been successfully saved")).catch(()=>res.status(400).send("Data was not captured"));
});

//START SERVER
app.listen(port,()=>{
    console.log(`the application has started on port ${port}`);
})
