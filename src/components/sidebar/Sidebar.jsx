import "./sidebar.css";
import { useContext, useEffect, useState } from "react";
import "../online/online.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { 
  FaRss, 
  FaRegComments, 
  FaPlayCircle, 
  FaUsers, 
  FaBookmark, 
  FaQuestionCircle, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaSchool 
} from 'react-icons/fa';


import CloseFriend from "../closeFriend/CloseFriend";
import Online from "../online/Online";

export default function Sidebar() {
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
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <FaRss className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <FaRegComments className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <FaPlayCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <FaUsers className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <FaBookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <FaQuestionCircle className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <FaBriefcase className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <FaCalendarAlt className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <FaSchool className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
        {friends.map((friend, i) => (
        <li className="rightbarFriend" key={i}>
          <div className="rightbarProfileImgContainer">
            <img src={friend.profilePicture} alt={friend.username} className="rightbarProfileImg" />
            
          </div>
          <span className="rightbarUsername">{friend.username}</span>
        </li>
      ))}
        </ul>
      </div>
    </div>
  );
}
