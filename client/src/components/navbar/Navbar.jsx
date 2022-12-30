import React from 'react'
import './navbar.css'
import { clearCookie } from '../../cookieManager'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {

    const handleLogout = event => {
        event.preventDefault()
        clearCookie()
        localStorage.removeItem("userid")
        window.location="home";
        // location.redirect("/")
    }

  return (
      <>
          <div className="home-navbar">
              <div className="home-nav-logo">FRIENDS</div>
              <div className="home-nav-items">
                  <Link to="../profile" relative='path' className="home-nav-item">
                      My Profile
                  </Link>
                  <Link to="../home" relative="path" className="home-nav-item">
                      Home
                  </Link>
                  <a href="#" className="home-nav-item">
                      Chat
                  </a>
                  <a href="#" className="home-nav-item">
                      Search
                  </a>
                  <button className='logout' onClick={e => handleLogout(e)}>Logout</button>
              </div>
          </div>
      </>
  );
}
