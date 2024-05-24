// EditBlog.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from "../../firebaseinit";
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import styles from "./blog.module.css";

const EditBlog = () => {
  const { docId } = useParams();
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const blogRef = doc(db, 'blogs', docId);
  useEffect(() => {
    async function fetchData() {
      // const querySnapshot = await getDocs(collection(db, "blogs"));
      // const blogs = querySnapshot.docs.map((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   return {
      //     id: doc.id,
      //     ...doc.data()
      //   }
      // });
      const docRef = doc(db, "blogs", docId);
      const docSnap = await getDoc(docRef);
      setUpdatedTitle(docSnap.data().title);

      var htmlString = docSnap.data().content;

      // Create a temporary div element
      var tempDiv = document.createElement('div');

      // Set the innerHTML of the div to your HTML string
      tempDiv.innerHTML = htmlString;

      // Extract the text content from the div
      var textContent = tempDiv.textContent || tempDiv.innerText;

      // Log the result
      console.log(textContent);
      // setUpdatedContent(docSnap.data().content);
      setUpdatedContent(textContent);
      // console.log("may yha hu ", docSnap.data().title);
      // setBlogs(blogs);
    }
    fetchData();


  }, []);
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: updatedTitle,
      content: updatedContent,
    };
    try {
      await updateDoc(blogRef, updatedData);
      navigate("/createblog");
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };




  return (
    <>
      <h2>Edit Blog</h2>
      <div className={styles.section}>

        {/* Form for to write the blog */}
        <form onSubmit={handleUpdate}>

          {/* Row component to create a row for first input field */}
          <Row label="Update title">
            <input className={styles.input} required
              placeholder="Title of the Blog.."

              value={updatedTitle} onChange={(e) => { setUpdatedTitle(e.target.value) }}
            />
          </Row >

          {/* Row component to create a row for Text area field */}
          <Row label="Update Content">
            <textarea className={`${styles.input} ${styles.content}`} required
              placeholder="updated Content of the Blog goes here.."
              value={updatedContent} onChange={(e) => { setUpdatedContent(e.target.value) }} />
          </Row >

          {/* Button to submit the blog */}
          <button className={styles.btn}>Update</button>
        </form>

      </div>
    </>
  );
};

export default EditBlog;


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