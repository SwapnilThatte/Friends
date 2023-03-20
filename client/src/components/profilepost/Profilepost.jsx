import React from 'react'
import './profilepost.css'

export const Profilepost = ({post}) => {
    
    
  return (
      <>
      <div className="profile-post-card">
        <div className="pp-img-container">
          <img
              src={post.imageurl!==undefined?post.imageurl:"./vite.svg"}
              alt=""
              className="profile-posts"
          />
        </div>
        <div className="pp-title">{post.title}</div>
        <div className="pp-desc">{post.desc}</div>
      </div>
      </>
  );
}
