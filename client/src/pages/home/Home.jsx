import React from "react";
import { HomeIntro } from "../../components/homeIntro/HomeIntro";
import { Navbar } from "../../components/navbar/Navbar";
import { Post } from "../../components/post/Post";
import "./home.css";
export const Home = () => {
    document.title = "FRIENDS"
    return (
        <>
            <Navbar />
            <div className="home">
                <div className="home-container">
                    <HomeIntro/>

                    <div>
                        <div className="home-post-container">
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
