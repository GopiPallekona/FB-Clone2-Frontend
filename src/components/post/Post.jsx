
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BsThreeDotsVertical } from 'react-icons/bs';
import {AiFillDelete} from 'react-icons/ai'
import {TiDelete} from "react-icons/ti"
import { BiSolidSend } from "react-icons/bi";
import "./post.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const SERVER_BASE_URL = "http://localhost:8888/images/";

export default function Post({ post,onDelete }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/api/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [post.userId]);


  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);


  const likeHandler = () => {
    try {
      axios.put(`http://localhost:8888/api/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:8888/api/posts/${post._id}`, { data: { userId: currentUser._id } });
      onDelete(post._id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${post._id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [post._id]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const submitCommentHandler = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        username: currentUser.username,
        text: newComment,
      };
      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
      localStorage.setItem(`comments_${post._id}`, JSON.stringify(updatedComments));
      setNewComment("");
    }
  };

  const deleteCommentHandler = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`comments_${post._id}`, JSON.stringify(updatedComments));
  };



  // Check if the img field is a full URL or just a filename
  const imageUrl = post.img && (post.img.startsWith('http') ? post.img : `${SERVER_BASE_URL}${post.img}`);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture || "/assets/person/defaultProfilePic.jpg"}
              alt=""
            /></Link>
            <span className="postUsername">
              {user.username || "Unknown User"}
            </span>
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          <div className="postTopRight">
            <BsThreeDotsVertical />
            {post.userId === currentUser._id && (
              <AiFillDelete className="deleteIcon" onClick={deleteHandler} />
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.img && <img className="postImg" src={imageUrl} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${SERVER_BASE_URL}like.png`}  alt="" onClick={likeHandler} />
            <img className="likeIcon" src={`${SERVER_BASE_URL}heart.png`} alt="" onClick={likeHandler}  />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={toggleComments}>{comments.length} comments</span>
          </div>
        </div>
        {showComments && (
          <div className="commentSection">
           
            <div className="input-send">
            <input
              type="text"
              className="commentInput"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          <BiSolidSend onClick={submitCommentHandler} className="commentButton" />
              
          
            </div>
            <div className="commentsList">
              {comments.map((comment, index) => (
                <div key={index} className="comment">
                  <span className="commentUser">{comment.username}:</span>
                  <span className="commentText">{comment.text}</span>
                  {comment.username === currentUser.username && (
                    <TiDelete className="commentDeleteIcon" onClick={() => deleteCommentHandler(index)} />
                  )}
                </div>
              ))}
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

