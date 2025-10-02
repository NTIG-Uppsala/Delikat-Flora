const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = 8080;

// Middleware to parse POST form data
app.use(express.urlencoded());

// Serve static files 
app.use('/admin', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/template');

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Middleware to protect /admin
function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

// Login page
app.get('/admin/login', (req, res) => {
    res.render('login', { error: '', username: '', focus: 'username' });
});

// Handle login form
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
        req.session.loggedIn = true;
        res.redirect('/admin');
    } else {
        res.render('login', { error: 'Fel användarnamn eller lösenord.', username: username, focus: 'password' });
    }
});

// Logout route
app.get('/admin/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
});

// **Protected admin page**
app.get('/admin', requireLogin, (req, res) => {
    res.sendFile(__dirname + '/admin.html');
});

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});
