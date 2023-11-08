import "./followers.css"
import { CgClose } from "react-icons/cg"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

export default function Followers({ setFollowers, currentId }) {
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    const getFollowers = async () => {
      const res = await axios.get("/users/followers/" + currentId);
      setFollower(res.data);
    };

    getFollowers();
  }, [currentId]);

  return (
    <div className="followers">
      <div className="followers-wrapper">
        <div className="followers-top">
          <span className="followers-title">Followers</span>
          <CgClose className="followers-close" onClick={() => setFollowers(false)} />
        </div>
        <div className="followers-bottom">
          {follower.map((f) => (
            <div className="followers-bottom_card">
              <img src={ f?.profilPicture ? f.profilPicture : "https://www.bing.com/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"} alt="" />
              <div className="followers-info">
                <span className="followers-username">{f?.username}</span>
                <span className="followers-name">{f?.name}</span>
              </div>
              <button className="followers-button">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
