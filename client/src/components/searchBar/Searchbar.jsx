import React from 'react'
import './searchbar.css'

export const Searchbar = () => {
  return (
      <div>
          <div className="searchbar-wrapper">
              <div className="searchbox">
                  <div className="search-input">
                      <input
                          type="text"
                          name="searchIP"
                          id="searchIP"
                          placeholder="Find Friends"
                          className="search-input-txt"
                      />
                  </div>
                  <button className="search-btn">
                  <div className="search-logo">
                      <span class="material-symbols-outlined">search</span>
                  </div>
                    Search
                  </button>
              </div>
          </div>
      </div>
  );
}
