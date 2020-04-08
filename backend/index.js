const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('../backend/config/keys')
    // const flash = require('connect-flash');
    // const session = require('express-session');

const app = express();



// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('conectado a mongoDB con éxito'))
    .catch(err => console.error(err))


// Express body parser
// app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// );



// Connect flash
// app.use(flash());

// Global variables
// app.use(function(req, res, next) {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

// Routes

app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));