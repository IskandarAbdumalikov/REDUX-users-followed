import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Empty from "../empty/Empty";
import {
  removeUser,
  followUser,
  unFollowUser,
} from "../../context/action/index";
import EditUser from "./edit-users/EditUsers";
import male from "../../assets/male-avatar-boy-face-man-user-9.svg";
import female from "../../assets/female-avatar-girl-face-woman-user-2.svg";
import "./Users.css";

function Users() {
  const userData = useSelector((state) => state.user.users);
  const followedUsers = useSelector((state) => state.user.followedUsers);
  const dispatch = useDispatch();
  const [showEditModule, setShowEditModule] = useState(null);

  const handleRemove = (id) => {
    dispatch(removeUser({ id }));
  };

  const handleEdit = (user) => {
    setShowEditModule(user);
  };

  const handleFollow = (user) => {
    if (followedUsers.find((u) => u.id === user.id)) {
      dispatch(unFollowUser(user));
    } else {
      dispatch(followUser(user));
    }
  };

  console.log(userData);

  return (
    <div className="users__wrapper">
      {userData ? (
        userData.map((user) => (
          <div className="users__card" key={user.id}>
            <img src={user.gender === "male" ? male : female} alt="avatar" />
            <h2>{user.name}</h2>
            <h3>{user.username}</h3>
            <p>{user.profession}</p>
            <p>{user.age} years old</p>
            <div className="users__card__btns">
              <button onClick={() => handleRemove(user.id)}>Remove</button>
              <button className="follow-btn" onClick={() => handleFollow(user)}>
                {followedUsers.find((u) => u.id === user.id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
              <button className="edit-btn" onClick={() => handleEdit(user)}>
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <Empty />
      )}
      {showEditModule && (
        <EditUser setShowEditModule={setShowEditModule} user={showEditModule} />
      )}
    </div>
  );
}

export default Users;
