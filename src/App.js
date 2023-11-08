import Home from "./pages/home/Home"
import "./app.css"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Extra from "./pages/extra/Extra";
import PostInfo from "./pages/postInfo/PostInfo";
import Stories from "./pages/storiesPage/Stories";
import Map from "./pages/map/Map";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/extra" element={user ? <Extra /> : <Login />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Login />} />
        <Route path="/messenger" element={user ? <Messenger /> : <Login />} />
        <Route path="/posts/:id" element={user ? <PostInfo /> : <Login />} />
        <Route path="/stories" element={user ? <Stories /> : <Login />} />
        <Route path="/map" element={user ? <Map /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
