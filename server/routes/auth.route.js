const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')


/* Authentication Routes */

/* User Registeration */ 
router.post('/register', async (req, res) => {
    // Make sure that the request.body is not empty
    if (req.body === null || req.body === undefined) {
        return res.status(400).json({msg : "Invalid User Credentials"})
    }
    else {
        // Extract information from Body
        const {name, email, password} = req.body
        
        // Check if the user already exists in the database
        const isExisting = await User.findOne({email : email})
        if (isExisting !== null) {
            return res
                .status(400)
                .json({ msg: "User already Existes" })
                .status(400);
        }
        else {
            try {
                // Hashing password
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)

                // Creating new user
                const user = new User({name : name, email : email, password : hashedPassword})
                const savedUser = await user.save()
                res.json({msg : "Registration Successful", user : savedUser})
            }
            catch(err) {
                // Return an error as response if any error occours in the registration process
                return res.status(400).json({ error: err });
            }
        }
    }
})




/* User Login */ 
router.post('/login', async (req, res) => {
    console.log(req.body);
    // Make sure that the request.body is not empty
    if (req.body === null || req.body === undefined) {
        return res.json({ msg: "Invalid User Credentials" });
    } 
    else {
        // Extract information from Body
        const { email, password } = req.body;

        // Checking whether a user exixts in database
        const isExisting = await User.findOne({ email: email });
        if (isExisting !== null) {
            try {
                // Checking hashed password 
                const checkPassword = await bcrypt.compare(
                    password,
                    isExisting.password
                );
                if (checkPassword) {
                    const secret = process.env.TOKEN_SECRET;
                    const salt = await bcrypt.genSalt(10)
                    const auth_token = await bcrypt.hash(secret,salt);

                    return res.json({
                        msg: "LoggedIn successfully",
                        user: isExisting,
                        authorization: auth_token,
                    });

                } else {
                    return res.json({ msg: "Incorrect Password" });
                }
            } catch (err) {
                return res.json({ msg: "User Does not exists" });
            }
        } else {
            return res.json({ msg: "User Does not exists" });
        }
    }
})

module.exports = router