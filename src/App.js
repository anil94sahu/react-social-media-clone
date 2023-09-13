import { Navigate, Route,Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css"
import Profile from "./components/Profile/Profile";
import Auth from "./pages/home/Auth/Auth";
import Home from "./pages/home/Home";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{right:'0', top:'-18%'}}></div>
      <div className="blur" style={{left:'-8rem', top:'36%'}}></div>
      {/* <Home />   */}
      {/* <Profile /> */}
      {/* <Auth /> */}
      
        <Routes>
          <Route path="/" element={user?<Navigate to="/home" /> : <Navigate to="auth" />} />
          <Route path="/home" element={user?<Home/>:<Navigate to='home' />} />
          <Route path="/auth" element={user?<Navigate to='../home' />:<Auth />} />
          <Route path="/profile/:id" element={user?<Profile />:<Navigate to="../auth" />} />
        </Routes>
    </div>
  );
}

export default App;
