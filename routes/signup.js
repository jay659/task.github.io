const express = require('express');
 const route=express.Router();

 //body parser porion
 const bodyparser=require('body-parser');
 route.use(bodyparser.urlencoded({extended:true}));
 route.use(bodyparser.json());

//  database
const userModel=require('../module/model');
 const mongoose = require('mongoose');
 mongoose.connect(
 'mongodb://localhost:27017/task'
 , {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
 });

 route.get('/',(req,res)=>{
        res.render('signup',{msg:''});
    })

route.post('/',(req,res)=>{
  const {uname,email,password,pass_details,confirmpassword}=req.body;
        if(!uname || !email || !password || !pass_details){
            res.render('signup',{msg:'please filled all the fields'});
        }else if(password.length<8){
          res.render('signup',{msg:'password must have 8 character'});
        }else if(password != confirmpassword){
          res.render('signup',{msg:'password does not match'});
        }
         if(typeof msg == 'undefined'){
              userModel.findOne({eMail:email},(err,user)=>{
                if(err) throw err;
                if(user){
                  res.render('signup',{msg:'user already exist'});
                }
                  else{
                    usermodel= new userModel({
                      userName:uname,
                      eMail:email,
                      password:password,
                      aboutYou:pass_details,
                    });
                  usermodel.save((err,data)=>{
                    console.log(data);
                    if(err) throw err;
                  
                    else if(data){
                      res.redirect('/viewdetails');

                    }
                  });
            
                }
             });
         }
  });
 module.exports=route;