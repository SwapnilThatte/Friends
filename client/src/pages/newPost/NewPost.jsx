import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import './newPost.css'
import {getUser} from '../../cookieManager'
import axios from 'axios'

import { predictions } from '../../toxicity_detection';

export const NewPost = () => {
    const userid = localStorage.getItem("userid");
  
  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState("")
  const [downloadURL, setDownloadUrl] = useState("");
  const [profile, setProfile] = useState({})
  const [desc, setDesc] = useState("")

  useEffect(() => {
      const getProfile = async () => {
          try {
              const cookie = getUser();
              if (cookie !== undefined) {
                  const response = await axios.post(
                      "http://localhost:5000/user/profile",
                      {
                          userid: userid,
                      }
                  );
                  
                  setDownloadUrl(response.data.user.profilePhotoURL);
                  setProfile(response.data.user);
              }
          } catch (err) {
            //   alert("An error occoured");
          }
      };
      
      getProfile();
  }, []);


   const getToxicityType = (predictions) => {
       
       predictions.forEach((ele, idx) => {
        if (ele.results[0].match === true) {
            return [true, ele.label]
        }
       })
       return [false, "non toxic"]
   }

   const handleClick = async event => {
  
    event.preventDefault()
    
    const toxicity_arr = await predictions(desc)
    const report = getToxicityType(toxicity_arr);
    
    if (!report[0]) {
            if (image !== undefined || image !== null) {

                const reader = new FileReader()
                reader.readAsDataURL(image)
    
                reader.onload = async () => {
                    const imageString = reader.result
                                    
                    const payload = {
                        userid: userid,
                        title: title,
                        post_desc: desc,
                        imageurl: imageString,
                    };
                    const response = await axios.post(
                        "http://localhost:5000/post/new",
                        payload
                        );
                        if (response.status === 200) {
                           
                        }
                    }
                }
         } else {
             alert(`Post description is ${report[1]}`);
         }     
    
   


   }

  return (
      <div>
          <Navbar />

          <div className="newPost">
              <div className="newPost-wrapper">
                  <div className="imgPreview-newpost">
                      <img src={image} alt="" className="imgpreview" />
                  </div>
                  <form className="newPost-form">
                      <div className="newpost-title">
                        <label htmlFor="title" className="IMGtitle">Title</label>
                        <input type="text" name="title" id="title" 
                        onChange={e => setTitle(e.target.value)}
                        className="IMG-title-input" />
                      </div>
                      
                      <div className="newpost-desc">
                        <label htmlFor="desc" className="IMGdesc">Description</label>
                        <textarea rows="6" cols="50" type="text" name="desc" id="desc" 
                        onChange={e => setDesc(e.target.value)}
                        className="IMG-desc-input" />
                      </div>


                      <div className="newpost-file">
                          <label htmlFor="file" className="newpost-file-btn">
                              Choose Photo
                          </label>
                          <input
                              type="file"
                              name="file"
                              id="file"
                              accept="image/*"
                              onChange={(e) => {
                                
                                  setImage(e.target.files[0]);
                              }}
                              className="newpost-uplod-file-btn"
                          />
                      </div>
                      <div className="uploadphoto">
                        <button type="submit" onClick={e => handleClick(e)} className='uploadpost'>Upload</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}
