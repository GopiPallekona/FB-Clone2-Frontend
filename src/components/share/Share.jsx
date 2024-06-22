// import "./share.css";
// import { FaRegImage, FaRegBookmark, FaMapMarkerAlt, FaRegSmile } from 'react-icons/fa';
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";

// export default function Share() {
//   const { user } = useContext(AuthContext);
//   const [desc, setDesc] = useState("");
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newPost = {
//       userId: user._id,
//       desc,
//     };

//     if (file) {
//       const data = new FormData();
//       const fileName = Date.now() + file.name;
//       data.append("name", fileName);
//       data.append("file", file);
//       newPost.img = fileName;
//       try {
//         await axios.post("http://localhost:8888/api/upload", data);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     try {
//       await axios.post("http://localhost:8888/api/posts", newPost);
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="share">
//       <div className="shareWrapper">
//         <div className="shareTop">
//           <img
//             className="shareProfileImg"
//             src={user.profilePicture ? user.profilePicture : "/assets/person/defaultProfilePic.jpg"}
//             alt=""
//           />
//           <input
//             placeholder={`What's in your mind ${user.username}?`}
//             className="shareInput"
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//           />
//         </div>
//         <hr className="shareHr" />
//         {file && (
//           <div className="shareImgContainer">
//             <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
//             <button className="shareCancelImg" onClick={() => setFile(null)}>Cancel</button>
//           </div>
//         )}
//         <form className="shareBottom" onSubmit={handleSubmit}>
//           <div className="shareOptions">
//             <label htmlFor="file" className="shareOption">
//               <FaRegImage className="shareIcon" style={{ color: 'tomato' }} />
//               <span className="shareOptionText">Photo or Video</span>
//               <input
//                 style={{ display: "none" }}
//                 type="file"
//                 id="file"
//                 accept=".png,.jpeg,.jpg"
//                 onChange={handleFileChange}
//               />
//             </label>
//             <div className="shareOption">
//               <FaRegBookmark className="shareIcon" style={{ color: 'blue' }} />
//               <span className="shareOptionText">Tag</span>
//             </div>
//             <div className="shareOption">
//               <FaMapMarkerAlt className="shareIcon" style={{ color: 'green' }} />
//               <span className="shareOptionText">Location</span>
//             </div>
//             <div className="shareOption">
//               <FaRegSmile className="shareIcon" style={{ color: 'goldenrod' }} />
//               <span className="shareOptionText">Feelings</span>
//             </div>
//           </div>
//           <button className="shareButton" type="submit">Share</button>
//         </form>
//       </div>
//     </div>
//   );
// }




import "./share.css";
import { FaRegImage, FaRegBookmark, FaMapMarkerAlt, FaRegSmile } from 'react-icons/fa';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8888/images/";

export default function Share() {
  const { user } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      try {
        const res = await axios.post("http://localhost:8888/api/upload", data);
        newPost.img = fileName; // Save only the filename in the database
      } catch (err) {
        console.error(err);
      }
    }

    try {
      await axios.post("http://localhost:8888/api/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture ? user.profilePicture : "/assets/person/defaultProfilePic.jpg"}
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <button className="shareCancelImg" onClick={() => setFile(null)}>Cancel</button>
          </div>
        )}
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <FaRegImage className="shareIcon" style={{ color: 'tomato' }} />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleFileChange}
              />
            </label>
            <div className="shareOption">
              <FaRegBookmark className="shareIcon" style={{ color: 'blue' }} />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <FaMapMarkerAlt className="shareIcon" style={{ color: 'green' }} />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <FaRegSmile className="shareIcon" style={{ color: 'goldenrod' }} />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}

