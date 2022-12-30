import React from 'react'
import './profilepost.css'

export const Profilepost = ({post}) => {
 
  return (
      <>
          <img
              src={post.imageurl}
              alt=""
              className="profile-posts"
          />
      </>
  );
}
