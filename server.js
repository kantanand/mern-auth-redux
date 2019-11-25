const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport');

const users = require('./routes/api/users');

const app = express();

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json());

// MongoDB config 
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, 
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err))

// Passport middleware 
app.use(passport.initialize());
// Passport config 
app.use("/api/users", users);



const port = process.env.PORT || 5000; // Heroku's gets port from env
app.listen(port, () => console.log(`Server up and running on port ${port} !`));