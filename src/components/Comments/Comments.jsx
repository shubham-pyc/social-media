import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Comment from "../Comment/Comment";
import useFetch from "../../hooks/useFetch";
import "./comments.css";

const Comments = ({ post }) => {
   const { token } = JSON.parse(Cookies.get("user"));
   const [userIDs, setUserIDs] = useState([]);
   const customFetch = useFetch();

   useEffect(() => {
      const userIds = post?.comments?.map((comment) => comment.username);
      setUserIDs(userIds);
   }, [post?.comments]);


   return (
      <div className="comments">
         <h3>{post?.comments?.length} Comments</h3>
         {post?.comments?.map((comment, i) => (
            <Comment
               key={comment.comment_id}
               comment={comment}
               user={comment.username}
            />
         ))}
      </div>
   );
};

export default Comments;
