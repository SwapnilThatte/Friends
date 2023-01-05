import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './homeintro.css'
import { getUser } from "../../cookieManager";
export const HomeIntro = () => {
    const userid = localStorage.getItem("userid");
    const [profile, setProfile] = useState({})
    const [posts, setPosts] = useState([])

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
                    //   console.log(response);
                      setProfile(response.data.user);
                      setPosts(response.data.posts)
                  }
              } catch (err) {
                  console.log(err);
              }
          };
          console.log(profile);
          getProfile();
      }, []);



  return (
      <>
          <div className="profile-short">
              <img
                  src={profile.profilePhotoURL}
                  alt=""
                  className="shortProfileName"
              />
              <div className="short-profile-name">{profile.name}</div>
              <div className="short-profile-info">
                  <div className="short-profile-followers">
                      <div>{profile.friends?.length}</div>
                      Friends
                  </div>
                  <div className="short-profile-following">
                      <div>{posts?.length}</div>
                      Posts
                  </div>
              </div>
              <div className="short-tagline">{profile.title}</div>
          </div>
      </>
  );
}
