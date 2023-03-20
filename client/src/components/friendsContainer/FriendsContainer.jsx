import React, { useEffect } from 'react'
import './friendsContainer.css'
import axios from 'axios'
import { getUser } from "../../cookieManager";
import { FriendCard } from '../friendsCard/FriendCard';

export const FriendsContainer = () => {
 const cookie = getUser();
 const userid = localStorage.getItem("userid");


  useEffect(() => {
   const getAllFriends = async () => {
     if (cookie !== undefined) {
     try {
         const response = await axios.post(
             "http://localhost:5000/user/friendsprofile",
             {
                 userid: userid,
             }
         );

        
         localStorage.setItem("user_friends", JSON.stringify(response.data.friends))
     } catch (error) {
        //  alert(error);
     }
    }
   }
   getAllFriends()
  },[])


  return (
    <div className='fc'>
      <div className="fc-title">My Friends</div>

      {
        JSON.parse(localStorage.getItem("user_friends"))?
        JSON.parse(localStorage.getItem("user_friends")).map(ele => (
          <FriendCard props={ele} key={ele._id}/>
        )):<h1>Loading...</h1>

      }
    </div>
  )
}
