import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      <div className="messenger-left_friend-pic">
        <img src={user?.profilePicture ? user?.profilePicture : "https://www.bing.com/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"} alt="" />
      </div>
      <div>
        <p className="messenger-left_friend-name">{user?.username}</p>
        <p className="messenger-left_friend-sub-text">Heyy whats up</p>
      </div>
    </>
  )
}
