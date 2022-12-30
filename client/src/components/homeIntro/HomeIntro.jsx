import React from 'react'
import './homeintro.css'
export const HomeIntro = () => {
  return (
      <>
          <div className="profile-short">
              <img
                  src="https://source.unsplash.com/1600x900/?boy"
                  alt=""
                  className="shortProfileName"
              />
              <div className="short-profile-name">John Doe</div>
              <div className="short-profile-info">
                  <div className="short-profile-followers">
                      <div>180</div>
                      Followers
                  </div>
                  <div className="short-profile-following">
                      <div>200</div>
                      Following
                  </div>
              </div>
              <div className="short-tagline">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta, odit?
              </div>
          </div>
      </>
  );
}
