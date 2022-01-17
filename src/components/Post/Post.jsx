import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, likePost } from "../../API";
import { setPosts, setSinglePost } from "../../features/postSlice";
import { dp, likeIcon, likeOutlined } from "../../assets";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { hideModal, showModal } from "../../features/modalSlice";
import useFetch from "../../hooks/useFetch";
import "./post.css";
import Options from "../Options/Options";

const Post = ({ singlepost, post }) => {
    const { token } = JSON.parse(Cookies.get("user"));
    const dispatch = useDispatch();
    const customFetch = useFetch();

    const { username } = useSelector(state => state.user);
    const id = username;

    let { posts } = useSelector(state => state.post);
    const isOwnPost = id === post.username;
    const isLiked = post?.likes?.users.hasOwnProperty(id);

    const slicePosts = (posts, data) => {

        const index = posts.reduce((acc, post, i) => {
            if (post.id === data.id) return i;
            return acc;
        }, -1);
        let slicedPosts = [...posts];
        slicedPosts.splice(index, 1, data);
        return slicedPosts;
    };

    const likeHandler = async () => {
        const data = await customFetch(likePost, post.id, token, !isLiked);
        if (data) {
            if (singlepost) {
                dispatch(setSinglePost(data));
            } else {
                let slicedPosts = slicePosts(posts, data);
                dispatch(setPosts(slicedPosts));
            }
        }
    };

    const commentHandler = async comment => {
        const data = await await customFetch(commentPost, post.id, comment, token);
        if (data) {
            let slicedPosts = slicePosts(posts, data);
            dispatch(setPosts(slicedPosts));
        }
    };


    return (
        <article className={singlepost ? "post halfborder" : "post"}>
            <header>
                <img src={dp} alt="profileImage" className="post__dp roundimage" />
                <div>
                    <h3>{post.username}</h3>
                </div>
            </header>
            <Link to={`/post/${post.id}`} className="post__details">
                {post.title && <p className="post__caption">{post.title}</p>}
                {post.media && <img src={`data:image/png;base64, ${post.media}`} alt="post_image" className="post__image" />}
            </Link>
            <div className="post__footer">
                <div className="post__reactions">
                    <img src={isLiked ? likeIcon : likeOutlined} alt="like" onClick={likeHandler} />
                    <p>{post.likes.total || ""}</p>
                </div>
                {singlepost || <Input placeholder={"Write a comment..."} handler={commentHandler} />}
            </div>
        </article>
    );
};

export default Post;
