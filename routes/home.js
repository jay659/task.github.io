 const express = require('express');
 const route=express.Router();

 const bodyparser=require('body-parser');



route.get('/',(req,res)=>{
   res.render('index');
});



 module.exports=route;

 
