import "./profile.css"
import Navbar from "../../components/navbar/Navbar"
import { FiSettings } from "react-icons/fi"
import { RiLayoutMasonryLine } from "react-icons/ri"
import { AiOutlinePlayCircle, AiOutlineTag, AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { BsBookmark } from "react-icons/bs"
import { useParams } from "react-router"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import Followers from "../../components/followers/Followers"
import Followings from "../../components/followings/Followings"
import { useNavigate } from "react-router"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [logOut, setLogOut] = useState(false);
  const [posts, setPosts] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [followings, setFollowings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    const getFollowedUsers = async () => {
      if (currentUser.followings.includes(user?._id)) {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    }
    getFollowedUsers();
  });

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile-wrapper">
          <div className="top">
            <div className="profile-img">
              <div className="img-wrapper">
                <img src={user.profilePicture ? user.profilePicture : "https://www.bing.com/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"} alt="" />
              </div>
            </div>
            <div className="profile-details">
              {user.username === currentUser.username && (
                <div className="profile-current_user-settings">
                  <p className="profile-username">{user.username}</p>
                  <button className="profile-edit">Edit Profile</button>
                  <button className="profile-settings"><FiSettings onClick={() => setLogOut(true)} /></button>
                </div>
              )}
              {user.username !== currentUser.username && (
                <div className="profile-user-settings">
                  <p className="profile-username">{user.username}</p>
                  <button className="profile-edit" onClick={handleClick}>{followed ? "Unfollow" : "Follow"}</button>
                  {followed ? (
                    <button className="profile-edit">Message</button>
                  ) : null}
                </div>
              )}
              <ul className="profile-stats">
                <li><span className="profile-stat-count">{posts.length}</span> posts</li>
                <li onClick={() => setFollowers(true)} ><span className="profile-stat-count" >{user.followers?.length}</span> followers</li>
                <li onClick={() => setFollowings(true)} ><span className="profile-stat-count" >{user.followings?.length}</span> following</li>
              </ul>
              <div className="profile-bio">
                <span className="profile-real-name">{user?.name}</span>
                <p className="profile-desc">{user?.desc}</p>
              </div>
            </div>
          </div>
          <div className="profile-filter">
            <a href="#" className="active"><RiLayoutMasonryLine className="filter-icon" /><span>Posts</span></a>
            <a href="#"><AiOutlinePlayCircle className="filter-icon" /><span>Videos</span></a>
            <a href="#"><BsBookmark className="filter-icon" /><span>Saved</span></a>
            <a href="#"><AiOutlineTag className="filter-icon" /><span>Tagged</span></a>
          </div>
          <div className="gallery">
            {posts.map((p) => (
              <div className="grid">
                <img src={p.img} alt="" key={p._id} />
                <div className="grid-content" onClick={() => navigate(`/posts/${p._id}`)}>
                  <span><AiFillHeart className="grid-icon" /> {p.likes?.length} </span>
                  <span><FaComment className="grid-icon" /> 0 </span>
                </div>
              </div>
            ))}
          </div>
          {logOut && (
            <div className="log-out">
              <div className="log-out_wrapper">
                <span onClick={logout}>Log Out</span>
                <span onClick={() => setLogOut(false)} className="back">Back</span>
              </div>
            </div>
          )}
          {followers && (
            <>
              <Followers setFollowers={setFollowers} currentId={user?._id} />
            </>
          )}

          {followings && (
            <>
              <Followings setFollowings={setFollowings} currentId={user?._id} />
            </>
          )}
        </div>
      </div>
    </>
  )
}
