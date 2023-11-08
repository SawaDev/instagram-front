import "./home.css"
import Navbar from '../../components/navbar/Navbar'
import Stories from '../../components/stories/Stories'
import Post from "../../components/post/Post"
import Recommendation from "../../components/recommendations/Recommendation"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router"
import axios from "axios"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const username = useParams().username;

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

  return (
    <>
      <Navbar />
      <div className='home'>
        <div className="wrapper">
          <div className="left">
            <Stories />
            {posts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </div>
          <div className="right">
            <Recommendation />
          </div>
        </div>
      </div>
    </>
  )
}
