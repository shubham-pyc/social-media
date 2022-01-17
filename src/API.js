import axios from "axios";
const API_ENDPOINT = "https://adramelech-fb-clone.herokuapp.com/api/v1";
// const API_ENDPOINT = "http://localhost:5000/api/v1";

const API_ENDPOINT_V1 = "https://posts.sgupta.workers.dev"

const loginUser = async (email) => {
   const {
      data
   } = await axios.post(`${API_ENDPOINT_V1}/login`, {
      username: email,
   });
   return data;
};

const fetchPosts = async (token, id, query) => {
   // if (id) {
   const {
      data
   } = await axios.get(`${API_ENDPOINT_V1}/posts`);
   return data;
   // }
   // if (query) {
   //    const { data } = await axios.get(`${API_ENDPOINT}/post?search=${query}`, {
   //       headers: {
   //          authorization: `Bearer ${token}`,
   //       },
   //    });
   //    return data;
   // }
   // const { data } = await axios.get(`${API_ENDPOINT}/post`, {
   //    headers: {
   //       authorization: `Bearer ${token}`,
   //    },
   // });
   // return data;
};

const fetchPost = async (id, token) => {
   const {
      data
   } = await axios.get(`${API_ENDPOINT_V1}/posts?id=${id}`, {
      headers: {
         authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const createPost = async (postData, token) => {
   postData = {
      ...postData,
      username: token
   }

   const {
      data
   } = await axios.post(`${API_ENDPOINT_V1}/posts`, postData, {
      headers: {
         // "Content-Type": "application/json",
         // authorization: `Bearer ${token}`,
      },
   });
   return data;
};

const likePost = async (id, token, add) => {

   let path = "/like";
   if (add == false) {
      path = "/unlike";
   }

   const {
      data
   } = await axios.post(
      `${API_ENDPOINT_V1}${path}`, {
         "id": id,
         "username": token
      }
   );
   return data;
};

const commentPost = async (id, comment, token) => {
   const {
      data
   } = await axios.post(
      `${API_ENDPOINT_V1}/comment`, {
         id,
         content: comment,
         username: token
      }, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      }
   );
   return data;
};


export {
   fetchPosts,
   fetchPost,
   createPost,
   likePost,
   loginUser,
   commentPost,
};