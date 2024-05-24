import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import CreateBlog from "./Components/Blogs/CreateBlog";
import NavBar from "./Components/NavBar/NavBar";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import { useEffect, useState } from "react";
import { auth } from "./firebaseinit";
import EditBlog from "./Components/Blogs/editBlog";
import MyBlog from "./Components/Blogs/MyBlog";
import PrivateRoute from "./Auth/PrivateRoute";
import PageNotFound from "./Components/PageNodeFound";
import { authContext, usernameContext } from "./Context";


function App() {
  const [userName, setUserName] = useState("");
  const [uid, setUid] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("login", user);
        setUserName(user.displayName);
        setUid(user.uid);
      } else {
        console.log("logout:");
        setUserName("");
        setUid("");
      }
    })
  }, [])
  return (
    <>
      <authContext.Provider value={uid} >
        <usernameContext.Provider value={userName} >
          <Router>
            {/* <NavBar name={userName} /> */}
            <Routes>
              <Route path="/" element={<Home name={userName} />} />
              <Route path="/login" element={<Login name={userName} />} />
              <Route path="/signup" element={<Signup name={userName} />} />
              <Route path="/createblog" element={<PrivateRoute Component={CreateBlog} />} />
              <Route path="/myblog" element={<PrivateRoute Component={MyBlog} />} />
              {/* element={<CreateBlog id={uid} name={userName} />} */}
              {/* <Route path="/myblog" element={<MyBlog id={uid} name={userName} />} /> */}
              <Route path="/about" element={<About />} />
              {/* <Route path="/editblog/:docId" element={<EditBlog />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </usernameContext.Provider>
      </authContext.Provider>
    </>
  );
}

export default App;
