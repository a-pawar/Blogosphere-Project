import { useState, useRef, useEffect } from "react";
import { db } from "../../firebaseinit";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import styles from "./blog.module.css";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { authContext } from "../../Context";


//Blogging App using Hooks
export default function MyBlog() {
  const uid = useContext(authContext);

  var [blogs, setBlogs] = useState([]);
  var titleRef = useRef(null);


  useEffect(() => {

    //real time update - listner
    const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
      const blogs = snapShot.docs.map((doc) => {
        // doc.data() is never undefined for query doc snapshots
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      console.log(blogs);
      const userSpecific = blogs.filter((blog) => blog.uid === uid)
      console.log(userSpecific);
      setBlogs(userSpecific);
    });
  }, []);

  async function handleDelete(id) {
    await deleteDoc(doc(db, "blogs", id));
  }
  return (
    <>
      <NavBar />
      <h2 className={styles.heada2}>Your Blogs </h2>
      {
        blogs.map((blog, i) => (
          <div className={styles.blog1} key={i} >
            <h2>{blog.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: blog.content }} />
            <div className={styles.blogbtn}>
              <button className={` ${styles.remove}`} onClick={() => { handleDelete(blog.id) }}>Delete</button>
            </div>
          </div >
        ))
      }
    </>
  )
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>{label}<br /></label>
      {props.children}
      <hr />
    </>
  )
}
