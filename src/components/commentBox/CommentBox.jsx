import "./commentBox.css"
import { AiOutlineHeart } from "react-icons/ai"
import { format } from "timeago.js"
import { useState, useEffect } from "react"
import axios from "axios"

export default function CommentBox({ comment }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users?userId=${comment.commentSender}`)
      setUser(res.data);
    }
    getUser();
  }, [comment])

  return (
    <div className="postInfo-main_comment">
      <img className="posInfo-main_comment-img" src={user.profilePicture} />
      <div className="postInfo-main_comment-content">
        <p>{user.username}</p>
        <p>{comment.comment}</p>
        <div className="postInfo-main_comment-content-time">
          <span>{format(comment.createdAt).split(' ', 2).join(' ')}</span>
          <span>Reply</span>
        </div>
      </div>
      <div className="postInfo-main_comment-heart">
        <AiOutlineHeart className="postInfo-main_comment-heart_icon" />
      </div>
    </div>
  )
}
