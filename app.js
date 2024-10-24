// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require("./model/user");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Body-parser o‘rnatish
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDBga ulanish
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName : "google-form"
}).then(() => {
  console.log('MongoDBga ulanish muvaffaqiyatli.');
}).catch(err => {
  console.error('MongoDBga ulanishda xato:', err);
});


// Ro'yxatdan o'tish uchun endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    // Yangi foydalanuvchini yaratish
    const newUser = new User({ email, password });
  
    try {
      await newUser.save();
      res.status(201).json({ message: 'Foydalanuvchi muvaffaqiyatli ro\'yxatdan o\'tgan.' });
    } catch (error) {
      console.error('Ro\'yxatdan o\'tishdagi xato:', error); // Log error
      res.status(400).json({ message: 'Xatolik: ' + error.message });
    }
  });

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlayapti...`);
});
