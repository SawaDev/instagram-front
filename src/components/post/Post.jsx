import "./post.css"
import axios from "axios"
import { format } from "timeago.js"
import send from "../../img/send.PNG"
import save from "../../img/save.PNG"
import { Link, useNavigate } from "react-router-dom";
import smile from "../../img/smile.PNG"
import option from "../../img/option.PNG"
import comment from "../../img/comment.PNG"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false ? post.likes.includes(currentUser?._id) : true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`/comments/${post._id}`)
      setComments(res.data);
    }
    getComments();
  }, [post]);

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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleKeyBoard = (e) => {
    if(e.keyCode === 13) {
      handleClick(e);
    }
  }

  return (
    <div className="post">
      <div className="info">
        <div className="user">
          <div className="profile-pic">
            <img src={
              user.profilePicture
                ? user.profilePicture
                : "https://www.bing.com/th?id=OIP.p84Y3smv-vWrUTlayWeueAHaHZ&w=250&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"
            } alt="" />
          </div>
          <Link to={`/profile/${user.username}`} style={{ textDecoration: 'none' }}>
            <p className="username">{user.username}</p>
          </Link>
        </div>
        <img src={option} alt="" className="options" />
      </div>
      <img src={post?.img} alt="" className="post-image" />
      <div className="post-content">
        <div className="post-reactions">
          <span className="post-icon" onClick={likeHandler} > {isLiked ? <AiFillHeart className="liked" /> : <AiOutlineHeart />}</span>
          <img src={comment} alt="" className="post-icon" />
          <img src={send} alt="" className="post-icon" />
          <img src={save} alt="" className="post-icon save" />
        </div>
        <p className="likes">{like} likes</p>
        {post.desc &&
          <p className="description"><span>{user.username}</span>{post?.desc}</p>
        }
        {post.comments.length > 0 &&
          <p className="view-comments" onClick={() => navigate(`/posts/${post._id}`)}>View {post?.comments.length} comments</p>
        }
        <p className="post-time">{format(post.createdAt)}</p>
      </div>
      <div className="comment-wrapper">
        <img src={smile} className="post-icon" alt="" />
        <input type="text" className="comment-box" placeholder="Add a comment" style={{ outline: 'none' }} onChange={(e) => setNewComment(e.target.value)} value={newComment} onKeyDown={handleKeyBoard} />
        <button className="comment-btn" onClick={handleClick}>post</button>
      </div>
    </div>
  )
}
