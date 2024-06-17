const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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


const BlogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  info: [{ type: String, required: true }],
  usageInstructions: [{ type: String, required: true }],
  relatedVideos: [{ type: String }], // Array of video URLs
  images: [{ type: String, required: true }], // Array of image URLs
  coverPic: { type: String, required: true }, // Cover image URL
  bulletPoints: [{ type: String, required: true }], // Array of bullet points
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the blog
});

BlogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Blog = mongoose.model('Blog', BlogSchema);

// Endpoint to create a new blog
app.post('/blogs/create', async (req, res) => {
    const { name, info, usageInstructions, relatedVideos, images,coverPic,bulletPoints, authorId } = req.body;
  
    if (!name || !info || !usageInstructions || !images ||!coverPic ||!bulletPoints || !authorId) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const author = await User.findById(authorId);
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
  
      const newBlog = new Blog({
        name,
        info,
        usageInstructions,
        relatedVideos,
        images,
        coverPic,
        bulletPoints,
        author: authorId,
      });
  
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } catch (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
app.get('/blogs', async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs', error });
    }
  });


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

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  orderHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  emailVerificationCode: String,
  emailVerificationExpiry: Date,
  phoneVerificationCode: String,
  phoneVerificationExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Generate reset token
userSchema.methods.generateResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  return resetToken;
};

const User = mongoose.model('User', userSchema);


app.post('/signup', async (req, res) => {
    try {
        // Check if the email already exists
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing Email" });
        }

        // Create a new user instance
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone
        });

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        // Save the user to the database
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'secret_ecom', { expiresIn: '1h' });

        // Respond with the user data and token
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
            const passCompare = await bcrypt.compare(req.body.password, user.password);
            if (passCompare) {
                const token = jwt.sign({ userId: user._id }, 'secret_ecom', { expiresIn: '1h' });
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
        const user = await User.findById(userId).populate('addresses orderHistory');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user profile
app.put('/user/:id', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


const addressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  });
  
 const Address = mongoose.model('Address', addressSchema);

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending' }
  });
  
const Order = mongoose.model('Order', orderSchema);
  



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