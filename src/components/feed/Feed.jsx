import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username 
          ? await axios.get(`http://localhost:8888/api/posts/profile/${username}`)
          : await axios.get(`http://localhost:8888/api/posts/timeline/${currentUser._id}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [username, currentUser._id]);

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === currentUser.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
}
