import React from 'react'
import app from '../../firebase'
import { useEffect, useState } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import axios from 'axios';


export const Update = () => {


    /*
        # TODO
            - Implement Axios request for updation of profile in mongodb
            - Ensure the backend is handeling the request properly
            -  Find out a way to delete the uploaded the file uploaded on google firebase storage
    */
    
  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState("");
  const [downloadURL, setDownloadUrl] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const uploadFile = (file) => {
      const storage = getStorage(app);
      const userid = localStorage.getItem("userid");
      const fileName = userid + "__"+ new Date().getTime() +"__"+ title;
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
            const userid = localStorage.getItem("userid");
            const profileRes = await axios.post(
                "http://localhost:5000/user/profile",
                {
                    userid : userid
                }
            );
            console.log("Profile Response ====> \n",profileRes);


            if (image) {
                console.log("IMAGE => ", image);
                uploadFile(image);

                const payload = {
                    title: title,
                    profilePhotoURL: downloadURL,
                    name: name,
                    email: email,
                };
                const response = await axios.post(
                    "http://localhost:5000/user/updateprofile",
                    payload
                );
                console.log(response);
            } else {
                console.error("Choose an image first !");
            }
            
        }
        catch(err) {
            console.log("ERROR ===> \n", err);
        }


      
  };



  return (
      <div>
          <form>
              <h1>Hello, World</h1>
              <label htmlFor="file">Upload File</label>
              <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => {
                      console.log(e.target.files);
                      setImage(e.target.files[0]);
                  }}
              />
              <br />
              <label htmlFor="title">Title</label>
              <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={(e) => handleClick(e)}>Upload</button>
              <br /><br />
              <img src={downloadURL} alt="" />
          </form>
      </div>
  );
}
