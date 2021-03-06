var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session=require('express-session');
var fileUpload = require('express-fileupload');
const { check, validationResult } = require('express-validator/check');


var config = require('./config');

var indexRouter = require('./routes/index');
var adminPageRouter = require('./routes/admin_pages');
var adminCategoryRouter = require('./routes/admin_categories');
var adminProductRouter = require('./routes/admin_products');
//var usersRouter = require('./routes/users');

mongoose.connect(config.database);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'Connection error'));
db.once('open',function(){
  console.log("Database Connected");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//file Upload middleware
app.use(fileUpload());

//express-session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//express-messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin/pages',adminPageRouter);
app.use('/admin/categories',adminCategoryRouter);
app.use('/admin/products',adminProductRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
