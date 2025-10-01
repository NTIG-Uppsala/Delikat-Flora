const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = 8080;

// Middleware to parse POST form data
app.use(express.urlencoded());

// Serve static files (CSS, JS, images)
app.use(express.static(__dirname));

// Session setup
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Middleware to protect /admin
function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
});

// Handle login form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
        req.session.loggedIn = true;
        res.redirect('/admin');
    } else {
        res.send('Fel användarnamn eller lösenord. <a href="/login">Försök igen</a>');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// **Protected admin page**
app.get('/admin', requireLogin, (req, res) => {
    res.sendFile(__dirname + '/admin.html');
});

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});
