import React from "react";
import { HomeIntro } from "../../components/homeIntro/HomeIntro";
import { Navbar } from "../../components/navbar/Navbar";
import { Post } from "../../components/post/Post";
import { useState, useEffect } from "react";
import { getUser } from "../../cookieManager";
import axios from 'axios'
import "./home.css";



export const Home = () => {

    document.title = "FRIENDS"
    const [posts, setPosts] = useState([]);
    let posts_arr = [];

    const getPosts = async (userid="") => {
        // getposts
        try {
            const cookie = getUser();
            // const userid = localStorage.getItem("userid");
            if (cookie !== undefined) {
                const response = await axios.post(
                    "http://localhost:5000/post/getposts",
                    {
                        userid: userid,
                    }
                );

                for (let i = 0; i < response.data.posts.length; i++) {
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
                return unique
                // setPosts(unique);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        const getFeed = async () => {
            let all_users = []
            try {
                const cookie = getUser();
                const userid = localStorage.getItem("userid");
                if (cookie !== undefined) {
                    const response_followers = await axios.post(
                        "http://localhost:5000/user/followingme",
                        {
                            userid: userid,
                        }
                    );
                    console.log(response_followers);

                    const response_following = await axios.post(
                        "http://localhost:5000/user/followingme",
                        {
                            userid: userid
                        }
                    );  

                    if (response_followers.status === 200 && response_following.status === 200) {
                         all_users = [
                             ...new Set([
                                 ...response_followers,
                                 ...response_following,
                             ]),
                         ];
                         console.log(all_users);
                    }

                   
                }
            }
            catch (err) {

            }
        }
        getFeed()

        //   getPosts();
    }, []);






    return (
        <>
            <Navbar />
            <div className="home">
                <div className="home-container">
                    <HomeIntro />

                    <div>
                        <div className="home-post-container">
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
                                <Post key={ele._id} props={ele} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
