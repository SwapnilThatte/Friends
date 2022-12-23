import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import './register.css'

export const Register = () => {
    document.title = "Register"

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async event => {
        event.preventDefault()
        const payload = {
            name : username,
            email : email,
            password : password
        }
        try {
            const response = await axios.post("http://localhost:5000/auth/register", payload)
            console.log(response)
        }
        catch(err) {
            console.log(err)
        }

    }


  return (
      <div className="register">
          <div className="register-logo">
              <div className="register-logo-text">CLUB</div>
              <div className="register-logo-subtitle">
                  Where the world meets!
              </div>
          </div>
          <form className="register-form-container">
              <div className="register-form-title">Register</div>
              <div className="register-form-input-group">
                  <label htmlFor="username" className="login-form-label">
                      Name
                  </label>
                  <input
                      type="text"
                      name="username"
                      id="username"
                      className="login-form-input"
                      onChange={(event) => setUsername(event.target.value)}
                  />
              </div>
              <div className="register-form-input-group">
                  <label htmlFor="email" className="login-form-label">
                      Email
                  </label>
                  <input
                      type="email"
                      name="email"
                      id="email"
                      className="register-form-input"
                      onChange={(event) => setEmail(event.target.value)}
                  />
              </div>
              <div className="register-form-input-group">
                  <label htmlFor="password" className="register-form-label">
                      Password
                  </label>
                  <input
                      type="password"
                      name="password"
                      id="password"
                      className="register-form-input"
                      onChange={(event) => setPassword(event.target.value)}
                  />
              </div>

              <button className="register-form-submit-btn" onClick={event => handleSubmit(event)}>
                  Create an Account
              </button>
              <a href="#" className="register-to-login-link">
                  Already have an account? Login!
              </a>
          </form>
      </div>
  );
}
