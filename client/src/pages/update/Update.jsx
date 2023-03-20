import React from 'react'
import { useEffect, useState } from 'react';

import { getUser } from '../../cookieManager'
import './update.css'
import axios from 'axios';
import { Navbar } from '../../components/navbar/Navbar';

export const Update = () => {


    const [image, setImage] = useState(undefined);
    const [currentURL, setCurrentURL] = useState("")
    const [title, setTitle] = useState("");
    const [downloadURL, setDownloadUrl] = useState("")
    const [name, setName] = useState("")
    const [profile, setProfile] = useState({})


    const userid = localStorage.getItem("userid");
   // To Get Profile
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
                    setName(response.data.user.name)
                    setTitle(response.data.user.title)
                }
            } catch (err) {
                // alert(err);
            }
        };
        // alert(profile);
        getProfile();
    }, []);


const reader = new FileReader();
    const handleClick = async (event) => {
        event.preventDefault();

        try {

            if (image !== undefined || image !== null) {
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = async () => {
                     const imageString = reader.result
                    const payload = {
                        userid: userid,
                        name: name,
                        profilePhotoURL:  imageString,
                        title: title,
                    };
                    
                    const response = await axios.post(
                        "http://localhost:5000/user/updateprofile",
                        payload
                    );
                    
                    setName(response.data.user.name)
                    setCurrentURL(response.data.user.profilePhotoURL);
                    setTitle(response.data.user.title)
                    location.reload()
                } 
               

            } else {
                alert("Choose an image first !");
            }

        }
        catch (err) {
            alert(err)
        }



    };



    return (
        
        <>
            <Navbar />

            <div className="update-page">
                <div className="update-preview">
                    <div className="profile-img">
                        <img
                            src={downloadURL}
                            alt=""
                            className="profilePhoto"
                        />
                    </div>
                    <div className="curr-profile-name">{name}</div>
                    <div className="curr-profile-title">{title}</div>
                </div>
                <div className="updations">
                  
                    <form className="update-form">
                        <div className="update-form-group">
                        
                            <label htmlFor="name" className="update-label">
                                Update Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="update-input"
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="update-form-group">
                            <label htmlFor="title" className="update-label">
                                Update profile Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="update-input"
                                defaultValue={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="update-form-group">
                            <label htmlFor="file" className="upload-file-btn">
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
                                className="choose-file-btn"
                            />
                        </div>
                        <button
                            type="submit"
                            className="update-submit-btn"
                            onClick={(e) => handleClick(e)}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
