import "./topbar.css";
import { AiOutlineSearch, AiOutlineUser, AiOutlineMessage, AiOutlineBell } from 'react-icons/ai';
import { useContext,useEffect,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Followers from "../followers/Followers";


export default function Topbar() {
  const { user,dispatch } = useContext(AuthContext);
  const navigate=useNavigate();
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showFollowers, setShowFollowers] = useState(false);

  const handleLogout=()=>{
    dispatch({type:"LOGOUT"});
    navigate("/login")
    
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8888/api/users/all");
      setUsers(res.data);
    };
    fetchUser();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
    const filtered = users.filter((u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">facebook</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <AiOutlineSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            id="search"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        <ul className="lab-ul">
          {searchInput &&
            filteredUsers.map((u, i) => (
              <li key={i}>
                <img className="topbarImg" src={u.profilePicture} alt="" />
                <Link to={`/profile/${u.username}`} className="username">
                  {u.username}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to={"/"}><span className="topbarLink">Homepage</span></Link>
          <Link to={"/feed"}><span className="topbarLink">Timeline</span></Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem" onClick={() => setShowFollowers(!showFollowers)}>
            <AiOutlineUser />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <AiOutlineMessage />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <AiOutlineBell />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        {user && <img src={user.profilePicture || "/assets/person/defaultProfilePic.jpg"} alt="" className="topbarImg" />}</Link>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {showFollowers && <Followers userId={user._id} />}
    </div>
  );
}
