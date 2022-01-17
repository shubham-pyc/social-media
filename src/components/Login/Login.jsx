import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { loginUser } from "../../API";
import useFetch from "../../hooks/useFetch";
import { setIsLoading } from "../../features/modalSlice";

const Login = ({ setIsRegistering }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const customFetch = useFetch();

   const loginHandler = async (e) => {
      e.preventDefault();
      dispatch(setIsLoading(true));
      const data = await customFetch(loginUser, email);
      if (data) dispatch(login(data));
      dispatch(setIsLoading(false));
   };

   return (
      <form onSubmit={loginHandler} className="login">
         <label htmlFor="login-email">Username</label>
         <input
            // type="email"
            id="login-email"
            placeholder="johndoe"
            value={email}
            onChange={(e) => {
               setEmail(e.target.value);
            }}
         />
         <button type="submit">Login</button>
      </form>
   );
};

export default Login;
