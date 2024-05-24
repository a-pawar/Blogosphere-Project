import { useState, useRef, useEffect } from "react";
import { db } from "../../firebaseinit";
import { collection, onSnapshot } from "firebase/firestore";
import styles from "./blog.module.css";


//Blogging App using Hooks
export default function DisplayBlog() {
  var [blogs, setBlogs] = useState([]);
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
      // Sorting the array based on timestamps
      console.log(blogs);
      blogs.sort((a, b) => b.createdOn - a.createdOn);
      console.log(blogs);
      setBlogs(blogs);
      const timestamp = blogs[0].createdOn;
      // Convert the timestamp to a Date object
      const oldDate = timestamp.toDate();
      // Get the current date
      const currentDate = new Date();
      // Calculate the difference in milliseconds
      const timeDifference = currentDate - oldDate;
      const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      // Calculate the difference in hours, minutes, and seconds
      let result;
      if (daysDifference === 0) {
        const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
        const minutesDifference = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
        const secondsDifference = Math.floor((timeDifference % (60 * 1000)) / 1000);
        result = `${hoursDifference} hours, ${minutesDifference} minutes, ${secondsDifference} seconds`;
      } else {
        // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
        result = `${daysDifference} days`;
      }
    });
  }, []);

  return (
    <div>
      {blogs.map((blog, i) => {
        // Assuming your timestamp object is stored in a variable named 'timestampObject'
        const timestamp = blog.createdOn;
        // Convert the timestamp to a Date object
        const oldDate = timestamp.toDate();
        // Get the current date
        const currentDate = new Date();
        // Calculate the difference in milliseconds
        const timeDifference = currentDate - oldDate;
        let result;
        // Calculate the difference in days
        const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        if (daysDifference != 0) {
          result = `${daysDifference} day`;
        }
        if (!result) {
          const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
          if (hoursDifference != 0) {
            result = `${hoursDifference} hour`;
          }
        }
        if (!result) {
          const minutesDifference = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
          if (minutesDifference != 0) {
            result = ` ${minutesDifference} min`;
          }
        }
        if (!result) {
          const secondsDifference = Math.floor((timeDifference % (60 * 1000)) / 1000);
          if (secondsDifference != 0) {
            result = ` ${secondsDifference} sec`;
          }
        }
        const htmlContent = blog.content;


        return (
          <div className={styles.blog} key={i}>
            <div className={styles.innerdiv}>
              <h2 className={styles.head2}>{blog.title}</h2>
              <h6>{` ${result} ago`}</h6>
              <h5>Posted by- {blog.createdBy}</h5>
            </div>

            <p dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {/* <p >{blog.content}</p> */}
          </div>
        );
      })}
    </div>
  );

  // return (
  //   <>

  //     <h2> Blogs </h2>

  //     {
  //       blogs.map((blog, i) => (
  //         <div className={styles.blog} key={i} >
  //           <div className={styles.innerdiv}>
  //             <h3>{blog.title}</h3>
  //             <h5>Posted by- {blog.createdBy}</h5>
  //           </div>

  //           <p>{blog.content}</p>
  //           <p>{

  //           }</p>



  //         </div >
  //       ))
  //     }
  //   </>
  // )
}

