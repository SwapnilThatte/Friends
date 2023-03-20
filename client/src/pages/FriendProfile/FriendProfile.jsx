import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Profilepost } from "../../components/profilepost/Profilepost";
import { getUser } from '../../cookieManager'
import axios from 'axios';

import './friendProfile.css'

export const FriendProfile = () => {
 
    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])

    let posts_arr = [];

    const userid = window.location.pathname.split('/')[2]
    const cookie = getUser();
    const localUserID = localStorage.getItem('userid')



    // UseEffect to get Profile
    useEffect(() => {
        const getProfile = async () => {
            try {
                
                if (cookie !== undefined) {
                    const response = await axios.post(
                        "http://localhost:5000/user/profile",
                        {
                            userid: userid,
                        }
                    );
                    setProfile(response.data.user);
                }
            } catch (err) {
                // alert("An error occoured");
            }
        };
        
        getProfile();
        
    }, []);
        
    const getPosts = async () => {
        // getposts
        try {
            const cookie = getUser();
            
            if (cookie !== undefined) {
                const response = await axios.post(
                    "http://localhost:5000/post/getposts",
                    {
                        userid: userid,
                    }
                );
 
                for(let i=0; i<response.data.posts.length; i++) {
                   
                    posts_arr.push(response.data.posts[i]);
                }

                let mymap = new Map();

               let unique = posts_arr.filter((el) => {
                    const val = mymap.get(el._id);
                    if (val) {
                        if (el.id < val) {
                            mymap.delete(el._id);
                            mymap.set(el._id, el.title);
                            return true;
                        } else {
                            return false;
                        }
                    }
                    mymap.set(el._id, el.title);
                    return true;
                });
                setPosts(unique)
            }
        } 
        catch (err) {
            // alert("An error occoured");
        }
    };
    
 useEffect(() => {getPosts()}, []);


    const removeFriend = async event => {
        
        try {
            const response = await axios.post(
                "http://localhost:5000/user/removefriend",
                {
                    userid: localUserID,
                    friendid: userid,
                }
            );
            
            location.reload()
        } catch (error) {
            // alert("An error occoured");
        }
    }


    const addFriend = async event => {
        try {
            const response = await axios.post("http://localhost:5000/user/addfriend", 
            {
                userid : localUserID,
                friendid : userid
            }) 
            
            location.reload()
        }
        catch(err) {
            // alert("An error occoured");
        }
    }



    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile">
                    <div className="profile-intro">
                        <img
                            src={profile.profilePhotoURL}
                            alt=""
                            className="profile-img"
                        />
                        <div>
                            <div className="profile-name">{profile.name}</div>

                            <div className="profile-tagline">
                                {profile.title}
                            </div>

                            <div className="follow-info">
                                <div className="profile-followers">
                                    <div className="follower-number">
                                        {profile.friends?.length}
                                    </div>
                                    <div className="follower-title">
                                        Friends
                                    </div>
                                </div>
                                <div className="profile-followers">
                                    <div className="follower-number">
                                        {posts?.length}
                                    </div>
                                    <div className="follower-title">Posts</div>
                                </div>

                                {profile.friends?.includes(localUserID) ? (
                                    <button
                                        className="friend-btn"
                                        onClick={(e) => removeFriend(e)}
                                    >
                                        Remove Friend
                                    </button>
                                ) : (
                                    <button
                                        className="friend-btn"
                                        onClick={(e) => addFriend(e)}
                                    >
                                        Add Friend
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="all-posts">
                        <div className="posts-title">
                            {profile.name}'s Posts
                        </div>
                        {/* <span class="material-symbols-outlined">add</span> */}
                        <div className="posts-grid">
                            <div className="newPost"></div>
                            {[
                                ...new Set(
                                    posts.map((ele) => ({
                                        id: ele._id,
                                        imageurl: ele.imageurl,
                                        owner: ele.owner,
                                        likes: ele.likes,
                                        title: ele.title,
                                        updatedAt: ele.updatedAt,
                                    }))
                                ),
                            ].map((ele) => (
                                <Profilepost key={ele._id} post={ele} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
