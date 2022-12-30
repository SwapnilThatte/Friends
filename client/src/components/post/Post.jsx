import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import './post.css'
export const Post = ({post}) => {
    // const [like_image, setLike_image] = useState("like_blank.png")
    // const [likeCounter, setLikeCounter] = useState(0)
    const [likeEvntCntr, setLikeEvntCntr] = useState(0);

    const handleLike = async event => {
        // event.preventDefault()
        console.log("Like Event ", likeEvntCntr);
        try {
            // const response = await axios.put("http://localhost:5000/post/like", {postid : post.ids})
            console.log(response);
            if (likeEvntCntr === 1) {
                document.getElementById("like_btn").classList.add('color-class')
                setLikeEvntCntr(0)
           }
           else {
            document.getElementById("like_btn").classList.remove("color-class");
            setLikeEvntCntr(1)

           }
        }
        catch(err) {
            console.log(err);
        }
    }

  return (
      <>
          <div className="post">
              <div className="post-owner-info">
                  <img
                      src="https://source.unsplash.com/1600x900/?girl"
                      alt="User Image"
                      className="post-owner-image"
                  ></img>
                  <div className="post-owner-name">
                      <div>John Doe</div>
                      <div className="post-title">This is Title</div>
                  </div>
              </div>
              <div className="post-image-container">
                  <img
                      src="https://source.unsplash.com/1600x900/?boy"
                      alt="Something went wrong"
                      className="post-image"
                  />
              </div>
              {/* <div className="post-title">This is Title</div> */}
              <div className="post-desc">
                  <div className="post-like-icon">
                      {/* <FontAwesomeIcon icon="fa-solid fa-heart" /> */}

                      {/* <img
                      src="like.png"
                      alt="like pink"
                      style={{ width: "50px", height: "48px" }}
                    /> */}
                      {/* {likevisible ? (
                          <img
                              src="like.png"
                              className="post-like"
                              onClick={handleLike()}
                          />
                      ) : (
                          <img
                              src="like_bank.png"
                              className="post-like"
                              onClick={handleLike()}
                          />
                      )} */}
                      <span
                          id="like_btn"
                          onClick={(e) => handleLike(e)}
                          alt="Like"
                          className="material-symbols-outlined post-like"
                          style={{fontSize : "2rem"}}
                      >
                          favorite
                      </span>

                      {/* <div className="post-info">100 Likes</div> */}
                      <div className="post-desc-info">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Ducimus labore dolores beatae deserunt velit
                          nemo{" "}
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}
