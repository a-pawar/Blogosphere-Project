import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../firebaseinit";
import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { authContext } from "../../Context";


export default function NavBar() {
  const uid = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [userName, setUserName] = useState(props.name);
  const [userid, setuserid] = useState(uid);

  const handlerLogOut = () => {
    // Your login logic here
    signOut(auth).then(() => {
      // Sign-out successful.
      setuserid("");
      console.log('Logging out...');
    }).catch((error) => {
      // An error happened.
      console.log('error in Log out...');
    });


  };
  return (
    <nav >
      <Link to="/" className={styles.title}>
        <div className={styles.flex}>
          <img className={styles.logo} src={`${process.env.PUBLIC_URL}/logo5.png`} alt="Example" />
          <div>
            BlogoSphere
          </div>
        </div>
      </Link>
      <div className={styles.menu} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? styles.open : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {userid ? <>
          {/* <li>
          <NavLink to="/">{`${props.name}`}</NavLink>
        </li> */}
          <li>
            <NavLink to="/myblog">MyBlog</NavLink>
          </li>
          <li>
            <NavLink to="/createblog">Create Blog</NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={handlerLogOut}>SignOut</NavLink>
          </li></>
          : <>
            <li>
              <NavLink to="/contact">Contact us</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">SignUp</NavLink>
            </li>
          </>

        }
      </ul>
    </nav>
  );
};