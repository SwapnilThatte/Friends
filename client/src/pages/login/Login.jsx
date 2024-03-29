import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './login.css'


export const Login = () => {
    document.title = "Login"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const payload = {email : email, password : password}
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/login",
                payload
            );
            localStorage.setItem("userid" , response.data.user._id)
            document.cookie = "auth-token="+response.data.authorization 

            window.location = "home";
            
        }
        catch(err) {
            // alert("Error in login, please try again")
        }
    }



  return (
      <div className="login">
          <div className="login-logo">
              <div className="login-logo-text">FRIENDS</div>
              <div className="login-logo-subtitle">Where the world meets!</div>
          </div>
          <form className="login-form-container">
              <div className="login-form-title">Login</div>
              <div className="login-form-input-group">
                  <label htmlFor="email" className="login-form-label">
                      Email
                  </label>
                  <input
                      type="email"
                      name="email"
                      id="email"
                      className="login-form-input"
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="login-form-input-group">
                  <label htmlFor="password" className="login-form-label">
                      Password
                  </label>
                  <input
                      type="password"
                      name="password"
                      id="password"
                      className="login-form-input"
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>

              <button
                  className="login-form-submit-btn"
                  onClick={(event) => handleSubmit(event)}
              >
                  Login
              </button>
              <Link to="../register" relative='path' className="login-to-register-link">
                  Don't have an account? Create One!
              </Link>
          </form>
      </div>
  );
}
