import "./onlineUsers.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OnlineUsers({ onlineUsers, setCurrentChat, currentId }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {onlineFriends.map((o) => (
        <div className="online-friends_card" onClick={handleClick}>
          <div className="online-friend_pic">
            <img src={o?.profilePicture ? o.profilePicture : "https://www.bing.com/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"} alt="" />
            <div className="online-friend_gadget"></div>
          </div>
          <p className="online-friend_name">{o?.username}</p>
        </div>
      ))}
    </>
  )
}
