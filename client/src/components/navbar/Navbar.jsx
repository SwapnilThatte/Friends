import React, { useState } from 'react'
import './navbar.css'
import { clearCookie } from '../../cookieManager'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {

    const handleLogout = event => {
        event.preventDefault()
        clearCookie()
        localStorage.removeItem("userid")
        localStorage.removeItem("feed")
        localStorage.removeItem("post_friends");
        window.location="home";
    }

  return (
      <>
          <div className="home-navbar">
              <div className="home-nav-logo">Friends</div>
              <div className="home-nav-items">
                  <Link to="../../profile" relative='path' className="home-nav-item">
                      My Profile
                  </Link>
                  <Link to="../../home" relative="path" className="home-nav-item">
                      Home
                  </Link>
                  <Link to="../../chat" relative='path' className="home-nav-item">
                      Chat
                  </Link>
                  <Link to="../../search" relative='path' className="home-nav-item">
                      Search
                  </Link>
                  <Link to="../../about" relative='path' className="home-nav-item">
                      About Us
                  </Link>
                  <button className='logout' onClick={e => handleLogout(e)}>Logout</button>
              </div>
          </div>
      </>
  );
}
