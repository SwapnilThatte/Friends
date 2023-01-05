import axios from "axios";
import { Link } from "react-router-dom";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Profilepost } from "../../components/profilepost/Profilepost";
import { getUser } from '../../cookieManager'
import "./profile.css";

export const Profile = () => {

    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])
let posts_arr = [];


    useEffect(() => {
        const getProfile = async () => {
            try {
                const cookie = getUser();
                const userid = localStorage.getItem("userid");
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
                console.log(err);
            }
        };
        console.log(profile);
        getProfile();

    }, []);

    const getPosts = async () => {
        // getposts
        try {
            const cookie = getUser();
            const userid = localStorage.getItem("userid");
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
            console.log(err);
        }
    };
    
 useEffect(() => {getPosts()}, []);

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
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. At veniam in facilis explicabo
                                consectetur cumque neque, ullam vero magni
                                obcaecati.
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

                                <Link
                                    to="../update"
                                    relative="path"
                                    className="update-link"
                                >
                                    <span class="material-symbols-outlined edit-logo">
                                        edit
                                    </span>
                                    {/* <br /> */}
                                    Edit
                                </Link>
                                <Link
                                    to="../newpost"
                                    relative="path"
                                    className="new-post"
                                >
                                    <span class="material-symbols-outlined ">
                                        add
                                    </span>
                                    {/* <br /> */}
                                    New Post
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="all-posts">
                        <div className="posts-title">My Posts</div>
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
};
