var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var apiKeys = require('./routes/api/keys');
var apiUsers = require('./routes/api/users');
var session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session存储到数据库
var MongoStore = require("connect-mongo")(session);
app.use(session({
	secret:"keymanagermenglingbujie",
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge:60*1000*30}, // 30 minus
	store: new MongoStore({
		url:"mongodb://localhost:27017/sessionstore",
	})
}));

app.all("*",function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	// res.header("Content-Type","application/json;charset=utf-8");
	next();
})

app.use('/', index);
app.use('/user', user);
app.use("/api",apiKeys);
app.use("/api/user",apiUsers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
  err.status = 404;
  res.render('common/404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('common/error');
});

module.exports = app;
