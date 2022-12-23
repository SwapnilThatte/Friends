const router = require('express').Router()
const authenticate = require("../authenticateUser");
const User = require("../models/user.model");
const Post = require("../models/post.model");


/* Post Routes*/ 

// Create a new Post,
// @Required => { userid, title, imageurl }
router.post('/new', async (req, res) => {
   // Authenticate user 
    if(authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            const {userid, title, imageurl} = req.body
            try {
                const post = new Post({ owner: userid, title : title, imageurl: imageurl });
                const savedPost = await post.save()
                return res.json({msg : "Post saved successfully", post : savedPost})
            }
            catch(err) {
                return res.json({msg : "Error in uploading post", success : false})
            }
        }
        else {
            res.json({ msg: "Request Body is undefined or null" });
        }
    }
    else {
        return res.json({msg : "Invalid User"})
    }
})

// Like the post
// @Required => postid
router.put('/like', async (req, res) => {
     // Authenticate user 
    if(authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            // Get postid and email from requsest
            const {postid} = req.body
            try {
                // Fetching post using postid
                const post = await Post.findById(postid);
                // Ensure that post exists
                if (post !== null || post !== undefined) {
                    // Incrementing the like count
                    const updatedLikeCount = post.likes + 1;
                    const updatedPost = await Post.findByIdAndUpdate(
                        postid,
                        updatedLikeCount,
                        { returnOriginal: false }
                    );
                    return res.json({ msg: "Like Count Updated" });
                } else {
                    return res.json({ msg: "Post does not exists" });
                }
            }
            catch(err) {
                return res.json({msg : "Error in updating like count"})
            }
        }
    }
    else {
        res.json({ msg: "Invalid User" });
    }
})


// Dislike the post
// @Required => postid
router.put('/dislike', async (req, res) => {
     // Authenticate user 
    if(authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            // Get userid and email from requsest
            const {postid} = req.body
            try {
                // Fetching post using postid
                const post = await Post.findById(postid)
                // Ensure that post exists
                if (post !== null || post !== undefined) {
                    // Decrementing the like count
                    const updatedLikeCount = post.likes-1
                    const updatedPost = await Post.findByIdAndUpdate(postid, updatedLikeCount, {returnOriginal : false})
                    return res.json({msg : "Like Count Updated"})
                }
                else {
                    return res.json({msg : "Post does not exists"})
                }
            }
            catch(err) {
                return res.json({msg : "Error in updating like count"})
            }
        }
    }
    else {
        res.json({ msg: "Invalid User" });
    }
})


// Delete an existing post
// @Required => postid, userid
router.delete('/deletepost', async (req, res) => {
     // Authenticate user 
    if(authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            // Get userid and email from requsest
            const {userid, postid} = req.body
            try {
                // Find user
                const user = await User.findById(userid)
                // Find post
                const post = await Post.findById(postid)
                // Check whether the user and the post exists or not
                if ((user !== null || user !== undefined) && (post !== null || post !== undefined)) {
                    // Ensure that only owner can delete the post
                    if (post.owner === user.id) {
                        // Deleting the post
                        await Post.findByIdAndDelete(postid);
                        return res.json({ msg: "Post deleted Successfully" });
                    }
                }
                else {
                    return res.json({msg : "Post or User does not exists"})
                }
            }
            catch(err) {
                return res.json({msg : "Error in fetching post details or account details"})
            }

        }
    }
    else {
        res.json({ msg: "Invalid User" });
    }
})

// Get all posts of a user
// @Required { userid }
router.post('/getposts', async (req, res) => {
    // Authenticate user 
    if(authenticate(req)) {
        // Check whether the request body is empty or not
        if (req.body !== null || req.body !== undefined) {
            try {
                const { userid } = req.body
                const posts = await Post.find({owner : userid})
                return res.json({msg : "Posts fetched successfully", posts : posts})
            }   
            catch(err) {    
                return res.json({msg : "Error in fetching data"})
            }
        }
        else {
            return res.json({msg : "Invalid Request"})
        }
    }
    else {
        return res.json({msg : "Invalid User"})
    }
})


module.exports = router