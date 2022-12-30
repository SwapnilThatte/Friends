import React from 'react'
import './post.css'
export const Post = () => {
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
                  <img src="like_icon.svg" alt="Like" className="post-like" />
                  {/* <div className="post-info">100 Likes</div> */}
                  <div className="post-desc-info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus labore dolores beatae deserunt velit nemo </div>
                    </div>

              </div>

          </div>
      </>
  );
}
