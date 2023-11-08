import "./navbar.css"
import logo from '../../img/logo.PNG'
import home from '../../img/home.PNG'
import messenger from '../../img/messenger.PNG'
import add from '../../img/add.PNG'
import explore from '../../img/explore.PNG'
import like from '../../img/like.PNG'
import { Link, useNavigate } from "react-router-dom"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { AiOutlineClose } from "react-icons/ai"
import { BsImages } from "react-icons/bs"
import axios from "axios"
import { IoMdCloseCircle } from "react-icons/io"
import { useEffect } from "react"

export default function Navbar() {
  const { user: currentUser } = useContext(AuthContext);
  const [newPost, setNewPost] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [file, setFile] = useState("");
  const desc = useRef();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users/search?q=${query}`)
      setData(res.data);
    }
    fetchUsers();
  }, [query])

  useEffect(()=> {
    const fetchCurrent = async () => {
      const res = await axios.get(`/users?username=${currentUser.username}`)
      setUser(res.data);
    }
    fetchCurrent();
  }, [currentUser])

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

      const post = {
        userId: currentUser._id,
        desc: desc.current.value,
        img: url,
      };

      await axios.post("/posts", post);
      setNewPost(false);
      navigate(`/profile/${currentUser.username}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='navbar'>
      <div className="navbar-wrapper">
        <img src={logo} alt="" className='logo-img' />
        <div className="navbar-search">
          <input type='text' className='search-box' placeholder='Search' onClick={() => setSearchActive(true)} onChange={(e) => setQuery(e.target.value)} />
          <IoMdCloseCircle className="search-icon" onClick={() => setSearchActive(false)} style={searchActive ? { display: "flex" } : { display: "none" }} />
        </div>
        <div className='navbar-items'>
          <img src={home} className="nav-icon" alt="" onClick={() => navigate("/")} />
          <img src={messenger} className="nav-icon" alt="" onClick={() => navigate("/messenger")} />
          <img src={add} className="nav-icon" alt="" onClick={() => setNewPost(true)} />
          <img src={explore} className="nav-icon" alt="" />
          <img src={like} className="nav-icon" alt="" />
          <Link to={`/profile/${currentUser.username}`}>
            <div className="nav-icon user-profile">
              <img src={user?.profilePicture ? user.profilePicture : "https://www.bing.com/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"} alt="" />
            </div>
          </Link>
        </div>

        {searchActive && (
          <>
            <div className="search-navigator"></div>

            <div className="search-result">
              {data.map((item) => (
                <Link to={`/profile/${item?.username}`} style={{ textDecoration: 'none' }}>
                  <div className="search-result_item">
                    <img src={item?.profilePicture ? item.profilePicture : "https://www.bing.com/th?id=OIP.Qv18Sm9Mw5F8Cy2aIjGm_QAAAA&w=212&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2"} alt="" />
                    <div className="followers-info">
                      <span className="followers-username">{item?.username}</span>
                      <span className="followers-name">{item?.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {newPost && (
          <div className="new">
            <AiOutlineClose className="close-icon" onClick={() => setNewPost(false)} />
            <div className="new-wrapper">
              <div className="new-header">
                <p>Create new post</p>
              </div>
              <div className="new-content">
                {file
                  ? (<>
                    <img src={URL.createObjectURL(file)} />
                    <AiOutlineClose className="new-close" onClick={() => setFile("")} />
                  </>)
                  : (<>
                    <BsImages className="new-icon" />
                    <h2 className="new-title">Choose photos and videos</h2>
                    <label className="new-button" htmlFor="file">Select from computer</label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                  </>)
                }
              </div>
              <div className="new-bottom">
                <input type="text" placeholder="your desc" ref={desc} />
                <button onClick={handleClick}>Post</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
