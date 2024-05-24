import { useState, useRef, useEffect } from "react";
import { db } from "../../firebaseinit";
import { collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from "./CreateBlog.module.css";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { authContext, usernameContext } from "../../Context";


//Blogging App using Hooks
export default function CreateBlog() {
  const id = useContext(authContext);
  const name = useContext(usernameContext);
  var [title, setTitle] = useState();
  var [content, setContent] = useState('');
  var [blogs, setBlogs] = useState([]);
  var titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);
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
      const userSpecific = blogs.filter((blog) => blog.uid === id)
      console.log(userSpecific);
      setBlogs(userSpecific);
    });
  }, []);

  //Passing the synthetic event as argument to stop refreshing the page on submit
  async function handleSubmit(e) {
    e.preventDefault();
    //setBlogs([{ title, content }, ...blogs]);

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "blogs"), {
      title: title,
      content: content,
      createdOn: new Date(),
      uid: id,
      createdBy: name,
    });
    // console.log("Document written with ID: ", docRef.docId);

    setTitle("");
    setContent("");
    titleRef.current.focus();
  }
  async function handleDelete(id) {
    await deleteDoc(doc(db, "blogs", id));
    //setBlogs(blogs.filter((blog, index) => i !== index))

  }
  // const [text, setText] = useState('');

  const handleChange = (value) => {
    console.log(value);
    setContent(value)
  };

  const modules = {
    toolbar: [
      // [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    // 'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <>
      <NavBar />

      <h1 className={styles.head1}>Write a Blog!</h1>
      <div className={styles.section}>

        <form onSubmit={handleSubmit} className={styles.form}>

          <Row label="Title">
            <input className={styles.input} required
              placeholder="Enter the Title of the Blog here.."
              ref={titleRef}
              value={title} onChange={(e) => { setTitle(e.target.value) }}
            />
          </Row >

          <Row label="Content">
            <ReactQuill
              value={content}
              modules={modules}
              formats={formats}
              onChange={handleChange}
              className={styles.content1}

            />
          </Row >

          {/* Button to submit the blog */}
          <div className={styles.subbtn}>
            <button className={styles.btn}>ADD</button>
          </div>
        </form>

      </div>
      {/* Section where submitted blogs will be displayed */}
      <h2 className={styles.head2}> Blogs </h2>
      {
        blogs.map((blog, i) => (
          <div className={styles.blog} key={i} >
            <h2 >{blog.title}</h2>
            {/* <p>{blog.content}</p> */}
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
      <label className={styles.row}>{label}<br /></label>
      {props.children}

    </>
  )
}
