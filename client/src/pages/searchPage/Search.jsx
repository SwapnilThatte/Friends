import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Searchbar } from '../../components/searchBar/Searchbar'
import { SearchResult } from '../../components/SearchResult/SearchResult'
import './search.css'


export const Search = () => {
  
  let hashMap = new Map();
const userid = localStorage.getItem("userid")
//   console.log("Element Rendered");
  const [results, setResults] = useState([])
  const [name, setName] = useState("")

const find = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/find", {
          nameToSearch: name.toLowerCase(),
      });
      const usersArr = res.data.users
      let arr = []
      for (let i=0; i<usersArr.length; i++) {
        if (usersArr[i]._id !== userid) {
          arr.push(usersArr[i]);
        } 
      }
      

                let unique = arr.filter((el) => {
                    const val = hashMap.get(el._id);
                    if (val) {
                        if (el.id < val) {
                            hashMap.delete(el._id);
                            hashMap.set(el._id, el.name);
                            return true;
                        } else {
                            return false;
                        }
                    }
                    hashMap.set(el._id, el.name);
                    return true;
                });
                setResults(unique)
      console.log(unique);
    }
    catch(err) {
      console.log("ERROR\n", err);
    }
  }
//  useEffect(() => {find()}, []);


 const handleSearch = (e) => {
    e.preventDefault()
    find()
 }



  return (
      <div>
          <Navbar />
          <div className="searchbar-wrapper">
              <div className="searchbox">
                  <div className="search-input">
                      <input
                          type="text"
                          name="searchIP"
                          id="searchIP"
                          placeholder="Find Friends"
                          className="search-input-txt"
                          onChange={e => setName(e.target.value)}
                      />
                  </div>
                  <button className="search-btn" onClick={e => handleSearch(e)}>
                      <div className="search-logo">
                          <span className="material-symbols-outlined">search</span>
                      </div>
                      Search
                  </button>
              </div>
          </div>

          <div className="search-result-container">
              {results.map((ele) => (
                // console.log(ele._id)
                  <SearchResult info={ele} key={ele._id} />
              ))}
          </div>
      </div>
  );
}
