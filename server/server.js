// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.JWT_SECRET || 'swathyshaji01';
// const app = express();
// app.use(cors());
// app.use(express.static('public'));
// // Connect to MongoDB database
// mongoose.connect('mongodb+srv://Swathy:swathy123@cluster0.4mgqf90.mongodb.net/reactdata?retryWrites=true&w=majority', { useNewUrlParser: true });
// const db = mongoose.connection;
// // Define schema for the uploaded files
// const fileSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   fileName: String,
//   filePath: String,
//   uploadedAt: { type: Date, default: Date.now }
// });
// // Create a model for the files collection
// const File = mongoose.model('File', fileSchema);
// // Define storage for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage }).array('file');

// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.status(500).json(err);
//     }

//     // Save the uploaded files along with the name and email of the user into MongoDB
//     const { name, email } = req.body;
//     const files = req.files.map(file => ({
//       name,
//       email,
//       fileName: file.filename,
//       filePath: file.path
//     }));
   
//     File.insertMany(files)
//       .then(docs => {
//         return res.status(200).send(docs);
//       })
//       .catch(err => {
//         return res.status(500).json(err);
//       });
//   });
// });

// // Define a route handler function for the GET method

// app.get('/file', (req, res) => {
//   File.find({})
//     .then(files => {
//       return res.status(200).json(files);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });
// app.delete('/file/:id', (req, res) => {
//   const id = req.params.id;
//   File.findByIdAndDelete(id)
//     .then(file => {
//       if (!file) {
//         return res.status(404).json({ message: 'File not found' });
//       }
//       return res.status(200).json({ message: 'File deleted successfully' });
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

// app.delete('/file', (req, res) => {
//   File.deleteMany({})
//     .then(deletedFiles => {
//       return res.status(200).json(deletedFiles);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

// app.listen(8001, () => {
//   console.log('App is running on port 8001');
// });
// const express = require('express')
// const multer = require('multer');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.JWT_SECRET || 'swathyshaji01';
// const app = express();
// app.use(cors());
// app.use(express.static('public'));
// app.use(express.json());

// // Connect to MongoDB database
// mongoose.connect('mongodb+srv://Swathy:swathy123@cluster0.4mgqf90.mongodb.net/reactdata?retryWrites=true&w=majority', { useNewUrlParser: true });
// const db = mongoose.connection;

// // Define schema for the uploaded files
// const fileSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   fileName: String,
//   filePath: String,
//   uploadedAt: { type: Date, default: Date.now }
// });

// // Create a model for the files collection
// const File = mongoose.model('File', fileSchema);

// // Define schema for user registration and authentication
// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String
// });

// // Create a model for the users collection
// const User = mongoose.model('User', userSchema);

// // Define storage for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage }).array('file');

// // Middleware to verify the JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   jwt.verify(token, jwtSecret, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     // Attach the decoded token payload to the request object
//     req.user = decoded;
//     next();
//   });
// };

// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   // Check if the username already exists in the database
//   User.findOne({ username })
//     .then(existingUser => {
//       if (existingUser) {
//         return res.status(409).json({ message: 'Username already exists' });
//       }

//       // Create a new user
//       const user = new User({ username, password });

//       // Save the user to the database
//       user.save()
//         .then(() => {
//           return res.status(200).json({ message: 'Registration successful' });
//         })
//         .catch(err => {
//           return res.status(500).json(err);
//         });
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Authenticate the user by checking the username and password
//   User.findOne({ username })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }

//       if (user.password !== password) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//       }

//       // Generate a JWT token and send it back to the client
//       const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '1h' });
//       return res.status(200).json({ token });
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

// app.post('/upload', verifyToken, (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.status(500).json(err);
//     }

//     // Save the uploaded files along with the name and email of the user into MongoDB
//     const { name, email } = req.user;
//     const files = req.files.map(file => ({
//       name,
//       email,
//       fileName: file.filename,
//       filePath: file.path
//     }));
   
//     File.insertMany(files)
//       .then(docs => {
//         return res.status(200).send(docs);
//       })
//       .catch(err => {
//         return res.status(500).json(err);
//       });
//   });
// });

// app.get('/file', verifyToken, (req, res) => {
//   File.find({})
//     .then(files => {
//       return res.status(200).json(files);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

// app.delete('/file/:id', verifyToken, (req, res) => {
//   const id = req.params.id;
//   File.findByIdAndDelete(id)
//     .then(file => {
//       if (!file) {
//         return res.status(404).json({ message: 'File not found' });
//       }
//       return res.status(200).json({ message: 'File deleted successfully' });
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

// app.delete('/file', verifyToken, (req, res) => {
//   File.deleteMany({})
//     .then(deletedFiles => {
//       return res.status(200).json(deletedFiles);
//     })
//     .catch(err => {
//       return res.status(500).json(err);
//     });
// });

// app.listen(8001, () => {
//   console.log('App is running on port 8001');
// });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'swathyshaji01';
const app = express();
app.use(cors());
app.use(express.static('public'));
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
