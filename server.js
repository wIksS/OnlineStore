var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    cookieParser = require('cookie-parser'),
    session = require("express-session"),
    mongoose = require('mongoose');


var env = process.env.NODE_ENV || 'development';
var port = 3030;

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(passport.initialize());

app.use(session({
    name: "connect.sid",
    resave: true,
    saveUninitialized:true,
    secret: 'this is the store secret',
    cookie:
    { secure: true }
    }
));
app.use(passport.session(
    { secret: 'this is the store secret' }));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/onlinestore');
var db = mongoose.connection;

db.once('open', function (err) {
    if (err) {
        console.log('Database could not be opened: ' + err);
        return;
    }

    dbDependent();
    console.log('Database up and running...');
});
function dbDependent(){
    require("./server/models/Product");
    require("./server/models/User");
    require("./server/config/passport");
    controllers = require("./server/controllers/index");
    auth = require("./server/config/auth");
    app.post("/register",controllers.users.createUser);
    app.post("/user",auth.login);
    app.put("/user",auth.logout);
}
db.on('error', function (err) {
    console.log('Database error: ' + err);
});

var messageSchema = mongoose.Schema({
    message: String
});

var Message = mongoose.model('Message', messageSchema);
var messageFromDb;

Message.remove({}).exec(function (err) {
    if (err) {
        console.log('Messages could not be removed: ' + err);
        return;
    }
    
    Message.create({
        message: 'Hi from Mongoose!'
    }).then(function (data) {
        messageFromDb = data.message;
    });
});

app.get('/products',function(req,res){
    console.log(controllers);
    res.render('partials/products',{
        message:controllers.products.getAllProducts()
    });
});

app.get('/partials/:partialName', function (req, res) {
    res.render('partials/' + req.params.partialName);
});

app.get('*', function(req, res) {
    res.render('index', {
        message: messageFromDb
    });
});

app.listen(port);

console.log('Server running on port: ' + port);

