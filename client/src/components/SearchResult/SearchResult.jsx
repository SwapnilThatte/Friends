import React from 'react'
import './searchresult.css'
export const SearchResult = ({info}) => {
  return (
    <div>
        <div className="search-result">
            <div className="result-profile-photo">
                <img src="vite.svg" className="result-image" alt="Profile Photo" />
            </div>
            <div className="result-txt">
            <div className="result-name">{info.name}</div>
            <div className="result-title">{info.title}</div>
            </div>
        </div>
    </div>
  )
}
