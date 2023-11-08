import "./postInfo.css"
import { BsThreeDots } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { CgClose } from "react-icons/cg"
import send from "../../img/send.PNG"
import save from "../../img/save.PNG"
import comment from "../../img/comment.PNG"
import smile from "../../img/smile.PNG"
import { useContext, useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import { format } from "timeago.js"
import CommentBox from "../../components/commentBox/CommentBox"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router"

export default function PostInfo() {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    }
    getPost();

    const getComments = async () => {
      const res = await axios.get(`/comments/${id}`)
      setComments(res.data);
    }
    getComments();

  }, [id]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    }
    getUser();
  }, [post])

  const handleClick = async (e) => {
    e.preventDefault();

    const comment = {
      commentSender: currentUser._id,
      postId: post._id,
      comment: newComment,
    };
    try {
      const res = await axios.post("/comments", comment);
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyBoard = (e) => {
    if (e.keyCode === 13) {
      handleClick(e);
    }
  }

  return (
    <div className="postInfo">
      <CgClose onClick={() => navigate(-1)} className="close-icon" />
      <div className="postInfo-wrapper">
        <div className="postInfo-img_wrapper">
          <img className="postInfo-img" src={post.img} />
        </div>
        <div className="postInfo-content">
          <div className="postInfo-header">
            <div className="postInfo-header_left">
              <img className="postInfo-header_img" src={user.profilePicture} />
              <div className="postInfo-header_content">
                <p>{user.username}</p>
                <p>place</p>
              </div>
              <span className="postInfo-header_follow">Following</span>
            </div>
            <div className="postInfo-header_right">
              <BsThreeDots className="postInfo-header_right-icon" />
            </div>
          </div>
          <div className="postInfo-main">
            {post?.desc &&
              <div className="postInfo-main_comment">
                <img className="posInfo-main_comment-img" src={user.profilePicture} />
                <div className="postInfo-main_comment-content">
                  <p>{user.username}</p>
                  <p>{post?.desc}</p>
                  <div className="postInfo-main_comment-content-time">
                    <span>{format(post.createdAt).split(' ', 2).join(' ')}</span>
                    <span>Reply</span>
                  </div>
                </div>
              </div>
            }

            {comments.map((c) => (
              <CommentBox comment={c} key={c._id} />
            ))}

          </div>
          <div className="postInfo-actions">
            <button className="postInfo-icon"> <AiOutlineHeart /></button>
            <img src={comment} alt="" className="postInfo-icon" />
            <img src={send} alt="" className="postInfo-icon" />
            <img src={save} alt="" className="postInfo-icon save" />
          </div>
          <div className="postInfo-comment_wrapper">
            <img src={smile} className="postInfo-icon" alt="" />
            <input type="text" className="comment-box" placeholder="Add a comment" style={{ outline: 'none' }} onChange={(e) => setNewComment(e.target.value)} value={newComment} onKeyDown={handleKeyBoard} />
            <button className="comment-btn" onClick={handleClick}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}
