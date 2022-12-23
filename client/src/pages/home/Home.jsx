import React from 'react'
import './home.css'
export const Home = () => {
  return (
      <div className="home">
          <div className="home-navbar">
              <div className="home-nav-logo">FRIENDS</div>
              <div className="home-nav-items">
                  <a href="#" className="home-nav-item">
                      My Profile
                  </a>
                  <a href="#" className="home-nav-item">
                      Home
                  </a>
                  <a href="#" className="home-nav-item">
                      Chat
                  </a>
                  <a href="#" className="home-nav-item">
                      Search
                  </a>
              </div>
          </div>

          <div className="home-post-container">
              <div className="post">
                  <div className="post-owner-info">
                      <img
                          src="https://source.unsplash.com/1600x900/?girl"
                          alt='User Image'
                          className="post-owner-image"
                      ></img>
                  </div>
                  <div className="post-image-container">
                      <img
                          src="https://source.unsplash.com/1600x900/?boy"
                          alt="Something went wrong"
                          className="post-image"
                      />
                  </div>
                  <div className="post-title">This is Title</div>
                  <div className="post-like-icon">
                      <img
                          src="like_icon.svg"
                          alt="Like"
                          className="post-like"
                      />
                  </div>
              </div>
          </div>
      </div>
  );
}
