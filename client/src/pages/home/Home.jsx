import React from "react";
import { HomeIntro } from "../../components/homeIntro/HomeIntro";
import { Navbar } from "../../components/navbar/Navbar";
import { Post } from "../../components/post/Post";
import { useState, useEffect } from "react";
import { getUser } from "../../cookieManager";
import axios from 'axios'
import "./home.css";



export const Home = () => {

    document.title = "Friends"
    const [feed, setFeed] = useState({data:null, status:"loading"})
    const [posts, setPosts] = useState([])
    const [loaderLimit, setLoaderLimit] = useState(true)
   const cookie = getUser();
            const userid = localStorage.getItem("userid");
            let res ;
    useEffect(() => {
        if (loaderLimit) {
            setLoaderLimit(false)
        }else {
            setLoaderLimit(false)
        }
        const getFeed = async () => {
            
            try {
                if (cookie !== undefined) {
                    await axios.post("http://localhost:5000/user/feed",
                    {
                        userid : userid
                    })
                    .then((response) => {
                        setFeed({status : "loaded", data : response})
                       res = response.data.feed
                       localStorage.setItem("feed", JSON.stringify(response.data.feed))
                        
                    })

                    console.log("res ", res);
                    setPosts(res)
                    console.log("posts ", posts);
                    // res.map(element => {
                    //    console.log(element); 
                    // });
                    
                    // console.log(response.data.feed);
                    // setFeed(response.data.feed);
                    // setTimeout(() => {
                        
                        // console.log(response);
                        // console.log("Feed ",feed);
                    // },2000)
                }

            } catch (error) {
                console.log(error);
            }
        }
        getFeed()
    },[])





    return (
        <>
            <Navbar />
            <div className="home">
                <div className="home-container">
                    <HomeIntro />

                    <div>
                        <div className="home-post-container">
                            {
                                JSON.parse(localStorage.getItem("feed")).map(
                                    (ele) => (
                                        <Post key={ele._id} props={ele} />
                                    )
                                )
                                // res.map((ele) => (
                                //     <Post key={ele._id} props={ele} />
                                // ))

                                // [
                                //     ...new Set(
                                //         res.map((ele) => ({
                                //             id: ele._id,
                                //             imageurl: ele.imageurl,
                                //             owner: ele.owner,
                                //             likes: ele.likes,
                                //             title: ele.title,
                                //             updatedAt: ele.updatedAt,
                                //         }))
                                //     ),
                                // ].map((ele) => (
                                //     <Post key={ele._id} props={ele} />
                                // ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
