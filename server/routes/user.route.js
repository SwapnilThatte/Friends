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

                return res.status(200).json({posts : posts, user : userDetails})
            }
            catch(err) {
                return res.status(404).json({msg : "Error in fetching Posts or account details"})
            }
        }
        else {
            return res.status(400).json({msg : "Invalid Request"})
        }
    }
    else {
        return res.status(400).json({msg : "Invalid User"})
    }
});







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


// To get feed on home page
// @Required {userid}
router.post('/feed', async (req, res) => {
// Authenticate user 
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            try {
               
                const {userid} = req.body
                const user = await User.findById(userid)
                const friends = user.friends
                friends.push(userid)
                let feed = await Post.find({
                    'owner' : {$in : friends}
                })
                let user_friends = await User.find({
                    '_id' : {$in : friends}
                })
                
               
                setTimeout(() => {
                    return res.status(200).json({feed : feed, user_friends : user_friends})
                }, 2000);
                
            }
            catch(err) {
                return res.status(400).json({ msg: "ERROR IN FETCHING FEED" });
            }
        }
        else {
            return res.status(400).json({msg : ""})
        }
    }
    else {
        return res.status(401).json({ msg: "Unauthorized User" });
    }
})



// Update profile 
// ** This route do not update the followers and following list
// CAN ONLY UPDATE NAME, PROFILE PHOTO, TITLE
// @Required {userid}
router.post('/updateprofile', async(req, res) => {
 // Authenticate user 
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            // First Get user from userid
            // Compare all updates with the existing user object
            // change only those values which are updated in request body
           
            const {
                userid,
                name,
                profilePhotoURL,
                title
            } = req.body;
            
            const requiredUser = await User.findOneAndUpdate(
                { _id: userid },
                { "$set": { "name": name,  "profilePhotoURL": profilePhotoURL, "title" : title } },
                
            );
            await requiredUser.save()
            


            
            return res
                .status(200)
                .json({ msg: "Update successful", user : requiredUser });
            
        }
    }
    else {
        return res.status(401).json({msg : "Unauthorized user to make changes"})
    }
})

// To get all firends
// @Required {userid}
router.post("/friends", async (req, res) => {
// Authenticate user 
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            try {
                const user = await User.findById(req.body.userid)
                
                res.status(200).json({friendsID : user.friends})
            }
            catch(err) {
                return res.status(400).json({msg : "ERROR IN FETCHING FREIENDS"})
            }
        }
        else {
            return res.status(400).json({msg : ""})
        }
    }
    else {
        return res.status(401).json({ msg: "Unauthorized User" });
    }
})



// To Find users
// @Required {userid, nameToSearch}
router.post("/find", async (req, res) => {
    // Authenticate user
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            const {userid, nameToSearch} = req.body
            const query = new RegExp(nameToSearch, "i")
            const users = await User.find({
                name: {
                    $regex : nameToSearch,
                    $options : 'i'
                },
            });
            
            res.json({users : users})

        } else {
            return res.status(400).json({ msg: "Empty request body" });
        }
    } else {
        return res.status(401).json({ msg: "Unauthorized User" });
    }
})


// Helper function for /removefriend endpoint
function getIndex(id, array) {
    array.forEach((element, index) => {
       if(element === id) {
        return index
       }
    })
    return -1 ;
}
// Remove Friend
// @Required {userid, firendID}
router.post("/removefriend", async (req, res) => {
    // Authenticate user
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            const {userid, friendid} = req.body
          
               const currUser = await User.findOneAndUpdate(
                   { _id: userid },
                   { $pull: { friends: friendid } }
               );

          
          // Remove userid from Friend's friends array
          
        const friendUser = await User.findOneAndUpdate({_id : friendid}, {$pull : {friends : userid}})

            res.status(200).json({msg : "Success", currUser, friendUser})
        }
        else {
            return res.status(400).json({ msg: "Empty request body" });
        }
    } else {
        return res.status(401).json({ msg: "Unauthorized User" });
    }
})


router.post('/addfriend', async (req, res) => {
       // Authenticate user
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            const {userid, friendid} = req.body
           
            // add friendid to User's (userid) friend array
            const currUser = await User.findById(userid)
            currUser.friends.push(friendid)
            await currUser.save()
           
            // add userid to Friend's (friendid) friend array
            const friendUser = await User.findById(friendid)
            friendUser.friends.push(userid)
            await friendUser.save()

            return res.status(200).json({msg : "successful", currUser, friendUser})
        }
        else {
            return res.status(400).json({ msg: "Empty request body" });
        }
    } else {
        return res.status(401).json({ msg: "Unauthorized User" });
    }  
})



router.post("/friendsprofile", async (req, res) => {
          // Authenticate user
    if (authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            const { userid } = req.body;
            const friends = await User.findById(userid)
            const friends_arr = friends.friends
            const friends_profile = await User.find({'_id' : {$in : friends_arr}})
            return res.status(200).json({ friends: friends_profile });
        }
        else {
            return res.status(400).json({ msg: "Empty request body" });
        }
    } 
    else {
        return res.status(401).json({ msg: "Unauthorized User" });
    } 
});


module.exports = router