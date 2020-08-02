var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require('web3');
var fileUpload = require("express-fileupload");
var hbs = require('hbs');

var Storage = require(path.join(__dirname, 'build/contracts/Storage.json'));
web3 = new Web3("http://localhost:8545");

//-- Edit Start Here ---

//coinbase = "0x6b8eaDbFeBC1B10e674cAaFbaf3B41f8A72b43f2";
coinbase = "0x85FfcAD5E2a573984cc430410e95F868CF5C05Ff";

contractAddress = Storage.networks['5777'].address;
var contractAbi = Storage.abi;

message = new web3.eth.Contract(contractAbi, contractAddress);

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var uploadRouter = require('./routes/uploadReport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper("equals", function(string1 ,string2, options) {
  if (string1 === string2) {
      return options.fn(this);
  } else {
      return options.inverse(this);
  }
});
app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/upload',uploadRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
