const express = require('express')

const port = 8000

const app = express();

const path = require('path')

app.use('/uploads',express.static(path.join(__dirname,('uploads'))))

const db = require('./config/mongoose')

const passport = require('passport')

const session = require('express-session')

const passportLocal = require('./config/passport-local')

app.use(session({
    secret : 'admin',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000*60*60
    }
}))

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded())

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication)

app.use('/',require('./routes'))

app.set('view engine','ejs')

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server start on port "+port);
})