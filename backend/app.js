const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require('./config/passport-jwt'); 
require('dotenv').config();
const port = process.env.PORT || 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())


const indexRouter = require('./routes/indexRouter');
const adminRouter = require('./routes/adminRouter')
const signUpRouter = require('./routes/signUpRouter');
const signInRouter = require('./routes/signInRouter')
const postRouter = require('./routes/postRouter');


app.use('/', indexRouter);
app.use('/admin-dashboard', adminRouter)
app.use('/signup', signUpRouter);
app.use('/signin', signInRouter);
app.use('/post', postRouter);

app.listen(port, "0.0.0.0", () => {
    console.log('Server is running on port 3000');
});