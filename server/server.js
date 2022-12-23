// Dependencies
const express = require('express')
const helmet = require('helmet')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

// Important Middlewares
app.use(cors());
dotenv.config()
app.use(express.json());
app.use(cookieParser());

// Settingup the port
const PORT = process.env.PORT | 5000

mongoose.set("strictQuery", false);

// Database Connection
mongoose.connect(process.env.DB_CONNECT, () => {
   console.log(`Connected to MongoDB Database`);
});


// Routing Auth Requests
const authRoute = require('./routes/auth.route')
app.use('/auth', authRoute)

// Routing User Request 
const userRoute = require('./routes/user.route')
app.use('/user', userRoute)

// Routing Post Requests
const postRoute = require('./routes/post.route')
app.use("/post", postRoute);




// Listening to client requests
app.use(helmet())
app.listen(PORT, () => {
   console.log(`Server Started on Port ${PORT}`)
})