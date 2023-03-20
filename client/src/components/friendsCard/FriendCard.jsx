import React from 'react'
import { useNavigate } from "react-router-dom";

import './friendCard.css'

export const FriendCard = ({props}) => {
   
     const navigate = useNavigate();

         const showProfile = (event) => {
             navigate(`/exploreprofile/${props._id}`, { replace: true });
};


  return (
      <div>
          <div className="f-conatiner" onClick={(e) => showProfile(e)}>
              <div className="fcard-img-container">
                  <img
                      src={
                          props.profilePhotoURL !== undefined ||
                          props.profilePhotoURL !== ""
                              ? props.profilePhotoURL
                              : "public/vite.svg"
                      }
                      alt="Profile Photo"
                      className="fcard-img"
                  />
              </div>
              <div className="fcard-info">
                  <div className="fcard-name">{props.name}</div>
                  <div className="fcard-title">{props.title}</div>
              </div>
          </div>
      </div>
  );
}
