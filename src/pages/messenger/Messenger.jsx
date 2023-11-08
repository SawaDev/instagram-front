import Navbar from "../../components/navbar/Navbar"
import "./messenger.css"
import { IoIosCall } from "react-icons/io"
import { BsCameraVideo, BsEmojiSmile } from "react-icons/bs"
import { AiOutlineInfoCircle, AiOutlineHeart } from "react-icons/ai"
import { TbPhoto } from "react-icons/tb"
import Message from "../../components/message/Message"
import { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import Conversation from "../../components/conversations/Conversation"
import { io } from "socket.io-client"
import OnlineUsers from "../../components/onlineUsers/OnlineUsers"

export default function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([]);
  const [friend, setFriend] = useState(null);
  const [send, setSend] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);


  useEffect(() => {
    const friendId = currentChat?.members.find((m) => m !== user._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [user, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value.length === 0) {
      setSend(false);
    } else {
      setSend(true);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id
    }

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
      setSend(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="messenger-wrapper">

          <div className="messenger-left">
            <div className="messenger-left_top">
              <span>{user.username}</span>
            </div>

            <div className="messenger-left_online" >
              <OnlineUsers onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
            </div>

            <div className="messenger-left_friends">
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <div className="messenger-left_friend-card">
                    <Conversation conversation={c} currentUser={user} key={c._id} />
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="messenger-right">
            {currentChat ? (
              <>
                <div className="messenger-right_top">
                  <div className="messenger-right_container">
                    <div className="messenger-right_friend-pic">
                      <img src={friend?.profilePicture ? friend.profilePicture : "https://www.bing.com/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"} alt="" />
                    </div>
                    <div>
                      <p className="messenger-right_friend-name">{friend?.username}</p>
                      <p className="messenger-right_friend-sub-text">Active now</p>
                    </div>
                  </div>
                  <div className="messenger-right_icons">
                    <IoIosCall className="messenger-right_icon" />
                    <BsCameraVideo className="messenger-right_icon" />
                    <AiOutlineInfoCircle className="messenger-right_icon" />
                  </div>
                </div>
                <div className="messenger-content">
                  {messages?.map((m) => (
                    <div ref={scrollRef}>
                      <Message key={m._id} own={m?.sender === user?._id} message={m} friend={friend} />
                    </div>
                  ))}
                </div>
                <div className="messenger-message_input">
                  <div className="messenger-message_input-wrapper">
                    <BsEmojiSmile className="messenger-message_input-icon" />
                    <input placeholder="Message..." type="text" value={newMessage} onChange={handleChange} />
                    {send ? (
                      <span className="messenger-message_send" onClick={handleSubmit}>Send</span>
                    ) : (
                      <>
                        <TbPhoto className="messenger-message_input-icon" />
                        <AiOutlineHeart className="messenger-message_input-icon" />
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open conversation to start a chat</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
