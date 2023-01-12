import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import './newPost.css'
import {getUser} from '../../cookieManager'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from 'axios'

export const NewPost = () => {
    const userid = localStorage.getItem("userid");
  
  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState("")
  const [downloadURL, setDownloadUrl] = useState("");
  const [profile, setProfile] = useState({})

   const uploadPost = (file) => {
       const storage = getStorage(app);
       const userid = localStorage.getItem("userid");
       const fileName = "POST" + userid+ new Date().getTime();
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
                   setDownloadUrl(downloadURL);
                   console.log("File available at", downloadURL);
               });
           }
       );
   };


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
              }
          } catch (err) {
              console.log(err);
          }
      };
      console.log(profile);
      getProfile();
  }, []);


   const onImageChange = async event => {
    event.preventDefault()
    setImage(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
        console.log(URL.createObjectURL(event.target.files[0]));
        setImage(URL.createObjectURL(event.target.files[0]));

        // uploadPost(image)



    }
   }

   const handleClick = async event => {
    event.preventDefault()
    uploadPost(image);
    setTimeout(async () => {
        const payload = {
        userid: userid,
        title: title,
        imageurl : downloadURL
    };
    const response = await axios.post("http://localhost:5000/post/new", payload)
    if (response.status === 200) {
        console.log(response);
    }
    }, 1000);


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
                                  console.log(e.target.files);
                                  onImageChange(e)
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
