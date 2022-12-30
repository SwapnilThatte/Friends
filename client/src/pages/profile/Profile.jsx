import axios from "axios";
import React from "react";
// import { useEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Profilepost } from "../../components/profilepost/Profilepost";
import { getUser } from '../../cookieManager'
import "./profile.css";

export const Profile = () => {

    const [profile, setProfile] = useState({})
    const [profileposts, setProfilePosts] = useState([])
    const [profileId, setProfileIds] = useState({})

    let keys = undefined
    let posts_obj_arr = [];


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
                    //  console.log(response.data.user);
                    // console.log(response);
                    setProfile(response.data.user);
                    // console.log(response);
                    // return response;
                }
            } catch (err) {
                console.log(err);
            }
        };

        getProfile();

    }, []);
    
    useEffect(() => {
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

                    // Gets keys form the response.data.posts object which is actual post
                    keys = Object.keys(response.data.posts);
                    console.log(`KEYS =====> ${keys}`);
                    // Access perticular post using each key from keys array
                    let temp_arr = []
                    keys.forEach((ele) => {
                         temp_arr.push(response.data.posts[ele]);
                    })


                    console.log(temp_arr);
                    /*
                    Algorithm:
                                            
                    
                    */
                    setProfileIds([...new Set(temp_arr.map((ele) => ele._id))]);
                    
                    // const id_Arr = [...new Set(temp_arr.map((ele) => ele._id))];
                    // let id_obj = {}
                    // keys.forEach((ele) => {
                        
                    //     // if (false) {
                    //         console.log(response.data.posts[ele]._id);
                    //         if (
                    //             id_Arr.includes(response.data.posts[ele]._id) &&
                    //             !Object.keys(id_obj).includes(
                    //                 response.data.posts[ele]._id
                    //             )
                    //         ) {
                    //             id_obj[response.data.posts[ele]._id] = 1
                    //             posts_obj_arr.push(response.data.posts[ele]);
                    //         }
                    //     // }
                    // });
                    setProfilePosts(posts_obj_arr);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getPosts()
    },[])

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile">
                    <div className="profile-intro">
                        <img
                            src="https://source.unsplash.com/1600x900/?boy"
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
                                        {profile.followers?.length}
                                    </div>
                                    <div className="follower-title">
                                        Followers
                                    </div>
                                </div>
                                <div className="profile-following">
                                    <div className="following-number">
                                        {profile.followedByMe?.length}
                                    </div>
                                    <div className="following-title">
                                        Following
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="all-posts">
                        <div className="posts-title">My Posts</div>
                        <div className="posts-grid">
                            {
                                
                                profileposts.map((ele) =>(
                                    <Profilepost key={ele._id} post={ele}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
