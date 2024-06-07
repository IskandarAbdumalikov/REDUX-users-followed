import React from "react";
import { useDispatch, useSelector } from "react-redux";
import male from "../../assets/male-avatar-boy-face-man-user-9.svg";
import female from "../../assets/female-avatar-girl-face-woman-user-2.svg";
import "./followers.scss";
import { followUser, unFollowUser } from "../../context/action";

function Followers() {
  const followedUsers = useSelector((state) => state.user.followedUsers);

  const dispatch = useDispatch();
  const handleFollow = (user) => {
    if (followedUsers.find((u) => u.id === user.id)) {
      dispatch(unFollowUser(user));
    } else {
      dispatch(followUser(user));
    }
  };

  return (
    <div className="followers__wrapper">
      {followedUsers?.map((user) => (
        <div className="followers__card" key={user.id}>
          <img src={user.gender === "male" ? male : female} alt="avatar" />
          <h2>{user.name}</h2>
          <h3>{user.username}</h3>
          <p>{user.profession}</p>
          <p>{user.age} years old</p>
          <div className="followers__card__btns">
            <button className="follow-btn" onClick={() => handleFollow(user)}>
              {followedUsers.find((u) => u.id === user.id)
                ? "Unfollow"
                : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Followers;
