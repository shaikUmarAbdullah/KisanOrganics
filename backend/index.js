const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//Database Connection
mongoose.connect('mongodb://localhost:27017/KisanOrganics');

//API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

app.use('/upload/images', express.static('D:/Ecommerce/backend/upload/images'));


//Image Storage

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const upload = multer({ storage: storage })

//Creating end points for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },
})


//API for adding Products
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else {
        id = 1;
    }
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//API endpoint for deleting product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

//API for geting all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


//schema for user model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);



// Define the schema for a cart item
const CartItemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const CartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartItemSchema],
    created_at: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', CartSchema);


//Schema For Order History
const OrderItemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    total_price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    status: { type: String, required: true, default: 'Pending' }
});

const Order = mongoose.model('Order', OrderSchema);





app.post('/signup', async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing Email" });
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        });

        await user.save();
        const token = jwt.sign({ userId: user._id }, 'secret_ecom');
        res.json({ success: true, token, userId: user._id });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// API for user login
app.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password;
            if (passCompare) {
                const token = jwt.sign({ userId: user._id }, 'secret_ecom');
                res.json({ success: true, token, userId: user._id });
            } else {
                res.json({ success: false, errors: "Wrong Password" });
            }
        } else {
            res.json({ success: false, errors: "Wrong Email" });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


// Route to get user details by ID
app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user profile
app.put('/user/:id', async (req, res) => {
    const { username, email, name, address, phone } = req.body;
    try {
      let user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.username = username || user.username;
      user.email = email || user.email;
      user.name = name || user.name;
      user.address = address || user.address;
      user.phone = phone || user.phone;
  
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });


// API endpoint for viewing a single product
app.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        // Construct the image URL based on the server address and the image path
        const imageUrl = `http://localhost:${port}/upload/images/${product.image}`;
        res.json({ success: true, product: { ...product._doc, imageUrl } });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


//Api for fetching cart items
// API endpoint for getting cart details
const authenticate = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, 'secret_ecom');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid Token' });
    }
};

// Add an item to the cart
app.post('/add', authenticate, async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        let cart = await Cart.findOne({ user_id: req.user.userId });
        if (!cart) {
            cart = new Cart({ user_id: req.user.userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product_id.equals(product_id));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product_id, quantity });
        }

        await cart.save();
        res.json({ success: true, cart });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Remove an item from the cart
app.post('/remove', authenticate, async (req, res) => {
    try {
        const { product_id } = req.body;

        const cart = await Cart.findOne({ user_id: req.user.userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.product_id.equals(product_id));

        await cart.save();
        res.json({ success: true, cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Update item quantity in the cart
app.post('/update', authenticate, async (req, res) => {
    try {
        const { product_id, quantity } = req.body;

        const cart = await Cart.findOne({ user_id: req.user.userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.product_id.equals(product_id));
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        await cart.save();
        res.json({ success: true, cart });
    } catch (error) {
        console.error('Error updating item quantity in cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Get the user's cart
app.get('/fetch', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.user.userId }).populate('items.product_id');
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.json({ success: true, cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Running on Port" + port)
    }
    else {
        console.log("Error :" + error)
    }
})