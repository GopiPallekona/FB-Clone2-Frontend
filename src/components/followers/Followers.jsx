import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./followers.css";

export default function Followers({ userId }) {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/api/users/followers/${userId}`);
        setFollowers(res.data);
      } catch (err) {
        console.error("Failed to fetch followers", err);
      }
    };
    fetchFollowers();
  }, [userId]);

  const handleAccept = (followerId) => {
    setFollowers(prevFollowers => prevFollowers.filter(follower => follower._id !== followerId));
  };

  return (

    <div className="followersContainer">
      <h3>Followers</h3>
      <ul>
        {followers.map((user) => (
          <li key={user._id}>
            <img src={user.profilePicture} alt="" className="followerUserImg" />
            <Link to={`/profile/${user.username}`} className="followerUsername">
              {user.username} <p>Has started following you</p>
            </Link>
            <button className="accept-req" onClick={()=>handleAccept(user._id)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
