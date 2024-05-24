import DisplayBlog from "../Blogs/DisplayBlog";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseinit";
import Marquee from "react-fast-marquee";
import NavBar from "../NavBar/NavBar";
export default function Home(props) {
  const [userName, setUserName] = useState(props.name);
  const [uid, setUid] = useState(props.id);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUserName(user.displayName);
        setUid(user.uid);
      } else {
        setUserName("");
      }
    })
  }, [])
  return (<>
    <NavBar />

    <div id={styles.colorblack}>

      <Marquee speed={150} className={styles.margintop}>
        <h2 className={styles.head1}>{userName ? `Welcome ${userName}` : "Signup / Login  your  account"}</h2>
      </Marquee>


      <DisplayBlog />
    </div>
  </>
  );

}