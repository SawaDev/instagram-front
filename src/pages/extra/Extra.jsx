import "./extra.css";
import axios from 'axios';
import { useRef, useState } from 'react'
import { BsUpload } from "react-icons/bs";
import logo from "../../img/logo.PNG"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Extra() {
  const [file, setFile] = useState("");
  const name = useRef();
  const desc = useRef();
  const navigate = useNavigate();
  const { user: currentUser, isFetching } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/sardor-s-company/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const user = {
        userId: currentUser._id,
        name: name.current.value,
        desc: desc.current.value,
        profilePicture: url,
      };

      await axios.put(`/users/${currentUser._id}`, user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="register">
      <div className="register-wrapper_2">
        <div className="profile_picture">
          <img src={file ? URL.createObjectURL(file) : "https://www.bing.com/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"} />
        </div>
        <div>
          <img src={logo} alt="" className="logo" />
        </div>
        <span className="register-desc">Please set these user Infos.</span>
        <div className="register-box">
          <input placeholder="name" className="register-input" type="text" ref={name} value={currentUser?.name}/>
          <input placeholder="desc" className="register-input" type="text" ref={desc} value={currentUser?.desc}/>
          <label htmlFor="file">Upload your Profile picture:  <BsUpload className="register-icon" /></label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
          <button className="register-btn" type="submit" onClick={handleClick}>{isFetching ? "loading" : "Upload"}</button>
        </div>
      </div>
    </div>

  )
}
