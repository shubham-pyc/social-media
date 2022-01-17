import React from "react";
import { dp, logoutIcon, home } from "../../assets";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import "./appbar.css";

const Appbar = () => {
    //global states
    const {
        user: { profileImage },
        modal: { isSidebarVisible },
    } = useSelector(state => state);

    //local states

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header className="appbar">
            <button onClick={logoutHandler} aria-label="logout">
                <img src={home} alt="logoutIcon" className="appbar__profile__logout" title="logout" />
            </button>
            <nav className="appbar__profile">
                <img src={profileImage || dp} alt="profileImage" className="appbar__profile__dp" title="profile" />
                <button onClick={logoutHandler} aria-label="logout">
                    <img src={logoutIcon} alt="logoutIcon" className="appbar__profile__logout" title="logout" />
                </button>
            </nav>
        </header>
    );
};

export default Appbar;
