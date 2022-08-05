import React, { useState } from "react";
import cn from "classnames";

import "../styles/Main.css";


const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
  const [clicked, setClicked] = useState(false);

  let none ;
  if(liked !== false){
    none = "none"
  }else{
    none = ""
  }
  const sendliked = () => {
    props.parentCallback(liked)
  }
  return (
    <button 
      onClick={() => {
        setLiked(true);
        setClicked(true);
      }}
      onChange={sendliked()}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
        clicked,
      })}
    >
      <div className="like-button">
        <span style={{display:none}}><i class='bx bx-heart' ></i></span>
        <span className={cn("suffix", { liked })}><i class='bx bxs-heart'></i></span>
      </div>
    </button> 
  );
};

export default LikeButton;
