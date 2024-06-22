




import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const username = useParams().username;



// old one 
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8888/api/users?username=${username}`);
      setUser(res.data);
      setIsFollowing(currentUser.followings.includes(res.data._id));
    };
    fetchUser();
  }, [username, currentUser]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.put(`http://localhost:8888/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
      } else {
        await axios.put(`http://localhost:8888/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? user.coverPicture : "/assets/person/defaultProfilePic.jpg"}
                alt=""
              />
             
              <img
                className="profileUserImg"
                src={user.profilePicture ? user.profilePicture : "/assets/person/defaultProfilePic.jpg"}
                alt=""
              />
              
            </div>
             <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
              {username !== currentUser.username && (
                <button className="followButton" onClick={handleFollow}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
