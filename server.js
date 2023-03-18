const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Route files
const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
const appointments =require('./routes/appointments');

const app=express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments', appointments);

//app.get('/', (req,res) => {
    //1. res.send('<h1>Hello from express</h1>');
    //2. res.send({name:'Brad'});
    //3. res.json({name:'Brad'});
    //4. res.sendStatus(400);
    //5. res.status(400).json({success:false});
    //res.status(200).json({success:true, data:{id:1}});
//});

//app.get('/api/v1/hospitals', (req,res) => {
//    res.status(200).json({success:true, msg:'Show all hospital'});
//});

//app.get('/api/v1/hospitals/:id', (req,res) => {
//    res.status(200).json({success:true, msg:'Show hospital ${req.params.id}'});
//});

//app.post('/api/v1/hospitals', (req,res) => {
//    res.status(200).json({success:true, msg:'Create new hospitals'});
//});

//app.put('/api/v1/hospitals/:id', (req,res) => {
//    res.status(200).json({success:true, msg:'Update hospital ${req.params.id}'});
//});

//app.delete('/api/v1/hospitals/:id', (req,res) => {
//    res.status(200).json({success:true, msg:'Delete hospital ${req.params.id}'});
//});

const PORT=process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=>process.exit(1));
});