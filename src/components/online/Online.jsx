import { useContext, useEffect, useState } from "react";
import "./online.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Online() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFriends = async () => {
      if (user?._id) {
        try {
          const res = await axios.get(`http://localhost:8888/api/users/${user._id}/friends`);
          setFriends(res.data);
          console.log(res.data); // Ensure data is coming in the console
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchFriends();
  }, [user]);

  return (
    <ul className="rightbarFriendsList">
      {/* Correct mapping with explicit return */}
      {friends.map((friend, i) => (
        <li className="rightbarFriend" key={i}>
          <div className="rightbarProfileImgContainer">
            <img src={friend.profilePicture} alt={friend.username} className="rightbarProfileImg" />
            <span className="rightbarOnline"></span>
          </div>
          <span className="rightbarUsername">{friend.username}</span>
        </li>
      ))}
    </ul>
  );
}
