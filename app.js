var createError = require('http-errors');
var express = require('express');
var http = require('http');

const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { Sequelize, DataTypes } = require("sequelize");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pokemonsRouter = require('./routes/pokemons');
var movesRouter = require('./routes/moves');

const models = require("./models");
const port = 3000

models.sequelize.sync({ alter: true }).then(() => {
  // Start listening
  console.log("Server started");
}).catch(errpr => {
  // catch erreur
  console.log(errpr);
});

var app = express();

var httpServer = http.createServer(app);

app.set('trust proxy', 1) // trust first proxy

const sessionMiddleware = session({
  secret: 'PokeZ0ne_01',
  name : 'pokezone', // Personnaliser le nom pour 'test' 
  resave: false,  
  cookie : { maxAge : 7 * 24 * 60 * 60 * 1000 },
  saveUninitialized: false
})

app.use(sessionMiddleware);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/pokezone')

// view engine setup
app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/views'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokemons', pokemonsRouter);
app.use('/moves', movesRouter);

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




var server = http.createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(server, options);

io.engine.use(sessionMiddleware);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', socket.request.session.pseudo + " : " + msg );
  });

  socket.on('position player', (msg) => {
    io.emit('position player', msg);
  });

});

server.listen(port);

