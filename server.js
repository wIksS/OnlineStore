var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV || 'development';
var port = 3030;

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/onlinestore');
var db = mongoose.connection;

db.once('open', function (err) {
    if (err) {
        console.log('Database could not be opened: ' + err);
        return;
    }
    
    console.log('Database up and running...');
});

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