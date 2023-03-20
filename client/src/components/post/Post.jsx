import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Like } from '../like/Like';
import './post.css'
export const Post = (props) => {
    // const [like_image, setLike_image] = useState("like_blank.png")
    // const [likeCounter, setLikeCounter] = useState(0)
    const [likeEvntCntr, setLikeEvntCntr] = useState(0);
    const [postOwner, setPostOwner] = useState("Fetching username...")
    
    const handleLike = async (event) => {
        
        try {
            const response = await axios.put(
                "http://localhost:5000/post/like",
                { postid: post.ids }
            );
           
            if (likeEvntCntr === 1) {
                document
                    .getElementById("like_btn")
                    .classList.add("color-class");
                setLikeEvntCntr(0);
            } else {
                document
                    .getElementById("like_btn")
                    .classList.remove("color-class");
                setLikeEvntCntr(1);
            }
        } catch (err) {
            // alert(err);
        }
    };


    useEffect(() => {
            const get_owner = async () => {
                const post_friends = JSON.parse(
                    localStorage.getItem("post_friends")
                );
                
                console.table(post_friends);
                for (const obj of post_friends) {
                    if (props.props.owner === obj._id) {
                        setPostOwner(obj.name);
                    }
                }
            };
            get_owner();
    }, [])

    
    return (
        <>
            <div className="post">
                <div className="post-owner-info">
                    <img
                        src={props.props.imageurl}
                        alt="User Image"
                        className="post-owner-image"
                    ></img>
                    <div className="post-owner-name">
                        <div>{postOwner}</div>
                        <div className="post-title">{props.props.title}</div>
                    </div>
                </div>
                <div className="post-image-container">
                    <img
                        src={props.props.imageurl}
                        alt="Something went wrong"
                        className="post-image"
                    />
                </div>
                {/* <div className="post-title">This is Title</div> */}
                <div className="post-desc">
                    <div className="post-like-icon">
                     <Like props={props}/>
                        {/* <div className="post-info">100 Likes</div> */}
                        <div className="post-desc-info">
                            {props.props?.post_desc}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
