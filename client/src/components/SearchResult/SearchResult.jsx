import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";

import './searchresult.css'

export const SearchResult = ({info}) => {

  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const showProfile = event => {
  navigate(`/exploreprofile/${info._id}`, {replace : true})  
  }


  return (
      <div onClick={(e) => showProfile(e)}>
          <div className="search-result">
              <div className="result-profile-photo">
                  <img
                      src={info.profilePhotoURL}
                      className="result-image"
                      alt="Profile Photo"
                  />
              </div>
              <div className="result-txt">
                  <div className="result-name">{info.name}</div>
                  <div className="result-title">{info.title}</div>
              </div>
          </div>
      </div>
  );
}
