import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const users = useSelector((state) => state.user.users);

  const userDataLength = users ? users.length : 0;

  return (
    <div className="navbar">
      <h2>Redux</h2>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/create-user"}>Create user</NavLink>
      <NavLink to={"/all-users"}>
        All users <sup>{userDataLength}</sup>
      </NavLink>
      <NavLink to={"/followers"}>Followers</NavLink>
    </div>
  );
}

export default Navbar;
