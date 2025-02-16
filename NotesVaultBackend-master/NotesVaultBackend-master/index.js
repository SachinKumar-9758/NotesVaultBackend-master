const express = require('express');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
require('dotenv').config();
const morgan = require('morgan');

const cors = require('cors');
const { connect } = require('./dbconfig/db');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
// Configure CORS
const allowedOrigins = ['http://localhost:3000']; // Replace with your frontend's URL
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Enable credentials (cookies, authorization headers)
  })
);

// Routes
app.get('/', function (req, res) {
  console.log('hello world');
  return res.json({ success: true });
});

app.use('/api/v1/notes/', notesRouter);
app.use('/api/v1/auth/', authRouter);

// Connect to MongoDB
connect();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
