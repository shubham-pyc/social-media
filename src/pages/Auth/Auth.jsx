import React, { useState } from "react";
import Login from "../../components/Login/Login";
import "./auth.css";

const Auth = () => {
   const [isRegistering, setIsRegistering] = useState(false);

   return (
      <section className={isRegistering ? "auth signup" : "auth"}>
         <Login setIsRegistering={setIsRegistering} />
      </section>
   );
};

export default Auth;
