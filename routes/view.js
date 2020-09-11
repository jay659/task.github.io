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

 const execDetails=userModel.find({});


//dispaly all the details
    route.get('/', (req, res) => {
      execDetails.exec((err,data)=>{
     
         if (err) throw err;

         res.render('show',{records:data});
      });
    
    });

    route.get('/delete/:id', (req, res) => {
      const Id=req.params.id;
         const deletedata  = userModel.findByIdAndDelete(Id);
         deletedata.exec((err,data)=>{
          if(err) throw err;
          if (data) {
            res.redirect('/viewdetails');
          }

         });
  });

  route.get('/edit/:id', (req, res) => {
    const id=req.params.id;
    userModel.findById({_id:id}).exec((err,data)=>{
        const uname=data.userName ;
        const email=data.eMail;
        const password=data.password;
        const aboutme=data.aboutYou ;
        
        if(err) throw err;
        res.render('edit',{msg1:'edit your details',id:id,Uname:uname,Email:email,Password:password,Aboutme:aboutme});
     
   });
});

route.post('/edit/:id', (req, res) => {
    const id=req.params.id;
    const {uname,email,password,pass_details}=req.body;
    userModel.findByIdAndUpdate(id,{userName:uname, eMail:email, password:password, aboutYou:pass_details }).exec((err,data)=>{
      if(err) throw err;
      res.redirect('/viewdetailsr');
    });
   
});


 module.exports=route;