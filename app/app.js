
/**
 * Module dependencies.
 */

var express = require('express')
    , host = process.env['DOTCLOUD_DB_MONGODB_HOST'] || 'localhost'
    , port = process.env['DOTCLOUD_DB_MONGODB_PORT'] ||  27017
    , port = parseInt(port)
    , dburl = process.env['DOTCLOUD_DB_MONGODB_URL'] || "mongodb://" + host + ":" + port + "/hustle"
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 8080);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('hustlesecret'));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.send(500, 'Something broke!');
    });
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

function index(req, res) {
    res.render('index');
}

function about(req, res) {
    res.render('about');
}

function contact(req, res) {
    res.render('contact');
}

app.get('/', index);
app.get('/about', about);
app.get('/contact', contact);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
