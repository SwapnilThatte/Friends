const router = require('express').Router()
const authenticate = require('../authenticateUser')
const User = require('../models/user.model')
const Post = require('../models/post.model')

/* User Routes */

// Get Profile along with account details and previous posts
// @Required => userid
router.post("/profile", async (req, res) => {
    // Authenticate user 
    if(authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            // Get userid and email from requsest
            const {userid} = req.body
            try {
                // Fetching all posts of the perticular user
                const posts = await Post.find({owner : userid})
                // Fetching account details of a perticular user
                const userDetails = await User.findById(userid)

                return res.json({posts : posts, user : userDetails})
            }
            catch(err) {
                return res.json({msg : "Error in fetching Posts or account details"})
            }
        }
        else {
            return res.json({msg : "Invalid Request"})
        }
    }
    else {
        res.json({msg : "Invalid User"})
    }
});





// Get all followers of the user
// @Required => userid
router.post('/followingme', async (req, res) => {
     // Authenticate user 
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            // Get userid and email from requsest
            const { userid } = req.body;
            try {
                const user = await User.findById(userid);
                console.log(user);
                if (user) {
                    return res.json({
                        msg: "Friends Found",
                        friends: user.following,
                    });
                } else {
                    return res.json({ msg: "User does not exists" });
                }
            }
            catch (err) {
                return res.json({
                    msg: "Error in fetching account details",
                });
            }
        }
        else {
            return res.json({ msg: "Invalid Request" });
        }
    } else {
        res.json({ msg: "Invalid User" });
    }

})





// Get all user followed by user
// @Required => userid
router.post('/followedbyme', async (req, res) => {
     // Authenticate user 
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            // Get userid and email from requsest
            const { userid } = req.body;
            try {
                const user = await User.findById(userid);
                const followedByMe = user.followedByMe
                return res.json({msg : "Followd by me", followedByMe : followedByMe})
            }
            catch(err) {
                return res.json({msg : "Error in fetching followings or user account details"})
            }
        } 
        else {
            return res.json({ msg: "Invalid Request" });
        }
    } 
    else {
        res.json({ msg: "Invalid User" });
    }

})



// Search a user
// @Required => userid, toSearchName
router.post('/search', async (req, res) => {
 // Authenticate user 
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            
            try {
                const {userid, toSearchName} = req.body
                const user = await User.findById(userid);
                const tosearchuser = await User.find({ name: toSearchName });
                if (user && tosearchuser) {
                    return res.json({msg : "Search Successful" , users : tosearchuser})
                } 
                else {
                    return res.json({ msg: "User does not exists" });
                }
            }
            catch(err) {
                return res.json({msg : "Error in feteching user details"})
            }
        
        } 
        else {
            return res.json({ msg: "Invalid Request" });
        }
    } 
    else {
        res.json({ msg: "Invalid User" });
    }
})


// Follow a user
// @Required { userid, usertofollowid }
router.post('/follow', async (req, res) => {
    // Authenticate user 
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            try {
                const {userid, usertofollowid} = req.body
                const user = await User.findById(userid)
                const usertofollow = await User.findById(usertofollowid)
                if (user && usertofollow) {
                    if (!user.followedByMe.includes(usertofollowid)) {
                        user.followedByMe.push(usertofollowid)
                        const savedUser = await user.save()
                        return res.json({msg : "User added successfully", user : savedUser})
                    }
                    else {
                        return res.json({msg : "User already follows this user"})
                    }
                }
                else {
                    return res.json({msg : "User not found"})
                }
            }
            catch(err) {
                return res.json({ msg: "Error in feteching user details" });
            }
        } 
        else {
            return res.json({ msg: "Invalid Request" });
        }
    } 
    else {
        res.json({ msg: "Invalid User" });
    }
})



// Update profile 
// @Required {userid}
router.post('/updateprofile', async(req, res) => {
 // Authenticate user 
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            // First Get user from userid
            // Compare all updates with the existing user object
            // change only those values which are updated in request body
            const updates = {}
            const {
                userid,
                email,
                password,
                profilePhotoURL,
                followers,
                followedByMe,
            } = req.body;
            const requiredUser = await User.findById(userid)
            if (email !== requiredUser.email) {
                updates["email"] = email
                req.body.email = email
            }
            if (password !== requiredUser.password) {
                updates["password"] = password
                req.body.password = password
            }
            if(profilePhotoURL !== requiredUser.profilePhotoURL) {
                updates["profilePhotoURL"] = profilePhotoURL
                req.body.profilePhotoURL = profilePhotoURL
            }
            return res.status(200).json({msg : "API IN DEVELOPEMENT", reqBody : updates})
            
        }
    }
    else {
        return res.status(401).json({msg : "Unauthorized user to make changes"})
    }
})








module.exports = router