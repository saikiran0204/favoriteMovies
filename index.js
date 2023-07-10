const express = require("express");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");

const loginController = require("./controller/login");
const movieController = require("./controller/movies");

const app = express();

// allow the app to use cookieparser
app.use(helmet());

app.use(bodyParser.urlencoded({extended: true}));
// app.use(function(req, res, next) {
//     console.log(req.path, req.method);
//     console.log(req.body);
//     next();
// })

// allow the app to use cookieparser
app.use(cookieparser());

app.use(require("./authentication").validate);
app.set('view engine', 'ejs');
app.set("views","./htmlPages");


app.get('/', function(req, res) {
    return res.redirect("/register");
})


// register template
app.get('/register', function(req, res) {
    return res.render("register.ejs", {message: ""});
});

// register using username and password
app.post('/register', function(req, res) {
    return loginController.register(req, res);
});

// get login template
app.get('/login', function(req, res) {
    return res.render("login.ejs", {message: ""});
});

// login using username and password
app.post('/login', function(req, res) {
    return loginController.login(req, res);
});


// clear the token and redirect to login
app.post('/logout', function(req, res) {
    res.clearCookie("authorization");
    return res.render("login", {message: "You are logged out successfully."});
});



app.get('/dashboard', function(req, res) {
    return movieController.getAll(req, res);
});

app.get('/editMovie', function(req, res) {
    return movieController.edit(req, res);
});

app.post('/editMovie', function(req, res) {
    return movieController.editApi(req, res);
});



app.get('/addMovie', function(req, res) {
    return res.render("addMovie.ejs");
});

app.post('/addMovie', function(req, res) {
    return movieController.add(req, res);
});

app.post('/delete', function(req, res) {
    return movieController.delete(req, res);
});


app.all("*", function(req, res) {
    return res.send("404 not found")
});


app.listen(5000, () => {console.log("server is running in port 5000")});