
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'swathyshaji01';
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://Swathy:swathy123@cluster0.4mgqf90.mongodb.net/reactdata?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

// Define schema for users
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Create a model for users
const User = mongoose.model('User', userSchema);

// Define schema for account details
const accountSchema = new mongoose.Schema({
  userId: String,
  accountNumber: String,
  balance: Number
});

// Create a model for account details
const Account = mongoose.model('Account', accountSchema);

// Signup route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Perform validation if needed

  // Create a new user document
  const newUser = new User({ email, password });
  newUser.save()
    .then(() => {
      // Create an account document for the new user
      const newAccount = new Account({ userId: newUser._id, balance: 0 });
      return newAccount.save();
    })
    .then(() => {
      return res.status(200).json({ message: 'Signup successful' });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Perform validation if needed

  // Find the user with the given email and password
  User.findOne({ email, password })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret);
      return res.status(200).json({ token });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Get account details route
app.get('/api/account-details', verifyToken, (req, res) => {
  const userId = req.userId;

  // Find the user's account
  Account.findOne({ userId })
    .then(account => {
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      // Return the account details
      return res.status(200).json({ account });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Post account details route
app.post('/api/account-details', verifyToken, (req, res) => {
  const userId = req.userId;
  const { accountNumber, balance } = req.body;

  // Perform validation if needed

  // Create a new account document for the user
  const newAccount = new Account({ userId, accountNumber, balance });
  newAccount.save()
    .then(() => {
      return res.status(200).json({ message: 'Account details added successfully' });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Deposit route
app.post('/api/deposit', verifyToken, (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  // Perform validation if needed

  // Find the user's account
  Account.findOne({ userId })
    .then(account => {
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      // Update the account balance
      account.balance += amount;
      return account.save();
    })
    .then(() => {
      return res.status(200).json({ message: 'Deposit successful' });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Account statement route
app.get('/api/statement', verifyToken, (req, res) => {
  const userId = req.userId;

  // Find the user's account
  Account.findOne({ userId })
    .then(account => {
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }

      // Generate the account statement
      const statement = `Account Statement for User: ${userId}\nBalance: $${account.balance}`;
      return res.status(200).json({ statement });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Verify token middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token from the 'Bearer' scheme
  const bearerToken = token.split(' ')[1];

  jwt.verify(bearerToken, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
}

app.listen(8001, () => {
  console.log('App is running on port 8001');
});
