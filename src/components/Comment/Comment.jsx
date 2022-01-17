import React from "react";
import { Link } from "react-router-dom";
import { dp } from "../../assets";
import "./comment.css";

const Comment = ({ comment, user }) => {
   return (
      <div className="comment">
            <img
               src={user?.profileImage || dp}
               alt={`${user}-dp`}
               className="comment__dp"
            />
         <div>
            <h3>{user}</h3>
            <p>{comment?.content}</p>
         </div>
      </div>
   );
};

export default Comment;
