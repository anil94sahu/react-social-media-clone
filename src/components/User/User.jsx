import React from "react";

const User = ({person, key}) => {
  return (
    <div className="follower" key={key}>
      <div>
        <img src={person.img} className="followerImage" alt="" />
        <div className="name">
          <span>{person.name}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button className="button fc-button">follow</button>
    </div>
  );
};

export default User;
