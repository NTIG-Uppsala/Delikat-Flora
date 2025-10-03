import express from 'express'
import session from 'express-session'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const PORT = 8080;


// Middleware to parse POST form data
app.use(express.urlencoded());

// Serve static files 
app.use('/admin', express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './template');

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

// Link page to database
const SUPABASE = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function fetchProducts() {
    let { data, error } = await SUPABASE
        .from('products')
        .select('*')
        .order('id')
    return data;
}

async function addproduct(productData) {
    if (productData.discount_price == '') { productData.discount_price = null }
    if (typeof productData.day_of_discount == 'string') { productData.day_of_discount = [productData.day_of_discount] }
    const { data, error } = await SUPABASE
        .from('products')
        .insert(productData)
        .select()
}

async function removeproduct(productId) {
    eriksson8
    const { error } = await SUPABASE
        .from('products')
        .delete()
        .eq('id', productId)
}

async function editprodcut(productData) {
    if (productData.discount_price == '') { productData.discount_price = null }
    if (typeof productData.day_of_discount == 'string') { productData.day_of_discount = [productData.day_of_discount] }
    if (!productData.day_of_discount) { productData.day_of_discount = null }
    if (!productData.is_min_price) { productData.is_min_price = false }
    console.log(productData)
    const { data, error } = await SUPABASE
        .from('products')
        .update(productData)
        .eq('id', productData.id)
    console.log(error)
}

// **Protected admin page**
app.get('/admin', requireLogin, async (req, res) => {
    res.render('admin', { products: await fetchProducts() });
});

app.get('/admin/edit', requireLogin, async (req, res) => {
    res.render('edit', { products: await fetchProducts(), id: req.query.id });
});

app.post('/admin/addproduct', requireLogin, async (req, res) => {
    await addproduct(req.body)
    res.redirect('/admin')
})

app.get('/admin/remove', requireLogin, async (req, res) => {
    await removeproduct(req.query.id)
    res.redirect('/admin')
})

app.post('/admin/editproduct', requireLogin, async (req, res) => {
    await editprodcut(req.body)
    res.redirect('/admin')
})

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});