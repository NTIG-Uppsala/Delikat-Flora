import express from 'express'
import session from 'express-session'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config();
import { decode } from 'base64-arraybuffer';
import multer from 'multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
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

async function addproductimage(imgFile) {
    const { imgData, imgError } = await SUPABASE
        .storage
        .from('product_images')
        .upload(imgFile.originalname, decode(imgFile.buffer.toString('base64')), {
            cacheControl: '3600',
            upsert: false,
            contentType: imgFile.mimetype
        })
    return process.env.SUPABASE_URL + '/storage/v1/object/public/product_images/' + imgFile.originalname
}

async function addproduct(productData, imgFile) {
    // Upload the product image and retrieve its public url
    productData.product_image = await addproductimage(imgFile)
    // Make sure all data to be sent to the database is in the expected format
    if (productData.discount_price == '') { productData.discount_price = null }
    if (typeof productData.day_of_discount == 'string') { productData.day_of_discount = [productData.day_of_discount] }
    // Insert the data in the database
    const { data, error } = await SUPABASE
        .from('products')
        .insert(productData)
        .select()
}

async function removeproductimage(productId) {
    // Retrieve the name of the product image from the product id 
    const { data } = await SUPABASE
        .from('products')
        .select('product_image')
        .eq('id', productId)
    const filePath = data[0].product_image
    const file = filePath.split('/')[filePath.split('/').length - 1]
    // Remove the image from storage
    const { error: imgError } = await SUPABASE
        .storage
        .from('product_images')
        .remove(file)
}

async function removeproduct(productId) {
    // Remove the product image from storage
    await removeproductimage(productId)
    // Delete the row of the product from the database 
    const { error } = await SUPABASE
        .from('products')
        .delete()
        .eq('id', productId)
}

async function editprodcut(productData, imgFile) {
    // Remove the current product image and add the new if there is a new image chosen for the product
    if (imgFile) {
        await removeproductimage(productData.id)
        productData.product_image = await addproductimage(imgFile)
    }
    // Make sure all data to be sent to the database is in the expected format
    if (productData.discount_price == '') { productData.discount_price = null }
    if (typeof productData.day_of_discount == 'string') { productData.day_of_discount = [productData.day_of_discount] }
    if (!productData.day_of_discount) { productData.day_of_discount = null }
    if (!productData.is_min_price) { productData.is_min_price = false }
    // Update the row of the product in the database
    const { data, error } = await SUPABASE
        .from('products')
        .update(productData)
        .eq('id', productData.id)
}

// **Protected admin page**
app.get('/admin', requireLogin, async (req, res) => {
    res.render('admin', { products: await fetchProducts() });
});

app.get('/admin/edit', requireLogin, async (req, res) => {
    res.render('edit', { products: await fetchProducts(), id: req.query.id });
});

app.post('/admin/addproduct', requireLogin, upload.single('product_image'), async (req, res) => {
    await addproduct(req.body, req.file)
    res.redirect('/admin')
})

app.get('/admin/remove', requireLogin, async (req, res) => {
    await removeproduct(req.query.id)
    res.redirect('/admin')
})

app.post('/admin/editproduct', requireLogin, upload.single('product_image'), async (req, res) => {
    await editprodcut(req.body, req.file)
    res.redirect('/admin')
})

app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});