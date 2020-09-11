 const express = require('express');
 const app=express();

//  get all the routes
const routes=require('./routes/home');
const signup_route=require('./routes/signup');
const view_route=require('./routes/view');

app.set('view engine','ejs');
app.use(express.static('public'));

 app.use('/',routes);
 app.use('/signup',signup_route);
 app.use('/viewdetails',view_route);
 

 

const port=process.env.PORT||5000;
 app.listen(port, () => {
     console.log(`Server started on ${port}`);
 });

