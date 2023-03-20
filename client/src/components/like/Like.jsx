import axios from "axios";
import React, { useState } from "react";
import './like.css'

export const Like = ({props}) => {
  
    const [updated, setUpdated] = useState(false);
    const [info, setInfo] = useState(props.props)
    let updated_count = props.props.likes+1

    const handleLike = async event => {

        try {
            const response = await axios.put(
                "http://localhost:5000/post/like",
                {
                    postid: info._id,
                    likecount : info.likes
                }
            );
            if(response.status === 200) {

                setUpdated(true)
            }
            setInfo(response.data.post)
        } catch (error) {
            // alert(error);
        }
    }

    return (
        <div onClick={(e) => handleLike(e)}>
           
            <span className="heart-icon" />
            <div className="like-count">{updated?updated_count : props.props.likes} Likes </div>
        </div>
    );
}
