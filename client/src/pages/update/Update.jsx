import React from 'react'
import app from '../../firebase'
import { useEffect, useState } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
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
                    console.log("From Profile Fetch ==> \n", response);
                    setDownloadUrl(response.data.user.profilePhotoURL);
                    setProfile(response.data.user);
                    setName(response.data.user.name)
                    setTitle(response.data.user.title)
                }
            } catch (err) {
                console.log(err);
            }
        };
        console.log(profile);
        getProfile();
    }, []);



    const uploadFileProfilePhoto = (file) => {
        const storage = getStorage(app);
        const userid = localStorage.getItem("userid");
        const fileName = "PROFILE__" + userid + "__" + new Date().getTime();
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log("An Error Occoured while uploading a file\n", error);
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setDownloadUrl(downloadURL)
                    console.log("File available at", downloadURL);
                });
            }
        );
    };

    const handleClick = async (event) => {
        event.preventDefault();

        try {

            if (image || downloadURL !== undefined || downloadURL !== null) {
                uploadFileProfilePhoto(image);

                setTimeout(async () => {
                    const payload = {
                        userid: userid,
                        name: name,
                        profilePhotoURL: downloadURL,
                        title: title,
                    };
                    const response = await axios.post(
                        "http://localhost:5000/user/updateprofile",
                        payload
                    );
                    console.log(
                        downloadURL === response.data.user.profilePhotoURL
                    );
                    console.log(
                        "Curr url : \n",
                        response.data.user.profilePhotoURL
                    );
                    setName(response.data.user.name)
                    setCurrentURL(response.data.user.profilePhotoURL);
                    setTitle(response.data.user.title)
                }, 5000);

            } else {
                console.error("Choose an image first !");
            }

        }
        catch (err) {
            console.log("ERROR ===> \n", err);
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
                                    // console.log(e.target.files);
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
