import "./recommendation.css"
import someUserImg from "../../img/cover 13.png"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Recommendation() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({})
  const [randomUser, setRandomUser] = useState([])

  useEffect(() => {
    const fetchCurrent = async () => {
      const res = await axios.get(`/users?username=${currentUser.username}`)
      setUser(res.data);
    }
    fetchCurrent();
  }, [currentUser])

  useEffect(() => {
    const randomUsers = async () => {
      const res = await axios.get(`/users/random/${currentUser.username}`)
      setRandomUser(res.data);
    }
    randomUsers();
  }, [currentUser])

  return (
    <div className="right">
      <div className="profile-card">
        <div className="profile-pic">
          <img src={user.profilePicture} alt="" />
        </div>
        <div className="recommendation-info">
          <p className="username"><a href={`/profile/${user.username}`}>{currentUser.username}</a></p>
          <p className="sub-text">{user?.name}</p>
        </div>
        <button className="action-btn"><a href={`/profile/${currentUser.username}`} style={{ textDecoration: 'none' }}>switch</a></button>
      </div>
      <p className="suggestion-text">Suggestions for you</p>
      {randomUser.map((u) => (
        <div className="profile-card" key={u._id}>
          <div className="profile-pic">
            <img src={u.profilePicture} alt="" />
          </div>
          <div className="recommendation-info">
            <Link to={`/profile/${u.username}`} style={{textDecoration: 'none'}}>
              <p className="username">{u?.username}</p>
            </Link>
            <p className="sub-text">followed bu user</p>
          </div>
          <button className="action-btn">follow</button>
        </div>
      )
      )}
    </div>
  )
}
