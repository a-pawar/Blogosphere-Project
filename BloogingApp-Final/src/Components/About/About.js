// import styles from "./about.module.css";
// import NavBar from "../NavBar/NavBar";
// import { useContext } from "react";
// import { authContext } from "../../Context";

// export default function About() {
//   const name = useContext(authContext);
//   return (<>
//     <NavBar name={name} />
//     <div className={styles.center}>
//       <div>
//         <h1 >This project is created by Anshul Pawar.</h1>
//         <h2>Connect me :- anshulpawar100@gmail.com</h2>
//       </div>
//     </div>

//   </>
//   );

// }

import React, { useState } from "react";
import myImage from './about.png';
import styles from './about.module.css';
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { authContext } from "../../Context";

function About() {
  const name = useContext(authContext);
  const [popover1, setPopover1] = useState(false);
  const [popover2, setPopover2] = useState(false);
  const [popover3, setPopover3] = useState(false);
  const [popover4, setPopover4] = useState(false);
  const [popover5, setPopover5] = useState(false);
  const [popover6, setPopover6] = useState(false);

  const togglePopover = (popoverSetter) => {
    popoverSetter(prev => !prev);
  };

  return (<>
    <NavBar name={name} />
    <div className={styles.aboutContainer}>
      <section className={styles.aboutSection}>
        <div className={styles.aboutHeader}>
          <div>
            <h1 className={styles.aboutTitle}>Share Your Story with Ease: Your Blogging Journey Starts Here!</h1>
            <p className={styles.aboutParagraph}>Welcome to our Blog App! Effortlessly log in with your Google account, create and post blogs in real-time, and enjoy a rich text editor with options for bold, italic, underline, images, and bullet points. Share your thoughts and stories with the world, and manage your posts seamlessly.</p>
          </div>
          <img src={myImage} alt="blog image" className={styles.aboutImage} />
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div>
          <button className={styles.featureButton} onClick={() => togglePopover(setPopover1)}>Google Authentication:. . . . . . . . . . . . </button>
          {popover1 && <div className={`${styles.popoverContent} ${styles.popoverVisible}`}>
            <span>Users can easily sign up and log in with their Google accounts.</span>
          </div>}
          <br /><br /><br />

          <button className={styles.featureButton} onClick={() => togglePopover(setPopover2)}>Real-Time Website Analysis . . . .</button>
          {popover2 && <div className={`${styles.popoverContent} ${styles.popoverVisible}`}>
            <span>Firebase provde real time data like how many pages got visited,how many new users visited site and new account with the help of graph.</span>
          </div>}
          <br /><br /><br />

          <button className={styles.featureButton} onClick={() => togglePopover(setPopover3)}> Rich Text Editor . . . . . . . . . . . .</button>
          {popover3 && <div className={`${styles.popoverContent} ${styles.popoverVisible}`}>
            <span>Users can format blogs with bold, italic, underline, images, and bullet points.</span>
          </div>}
        </div>
        <div className={styles.featureIconContainer}>
          <div className={styles.featureIcon}>
            <h1 className={styles.featureIconText}>Features</h1>
          </div>
        </div>
        <div>
          <button className={styles.featureButton} onClick={() => togglePopover(setPopover4)}>. . . . Real-Time Updates</button>
          {popover4 && <div className={`${styles.popoverContent} ${styles.popoverVisible}`}>
            <span>Firestore database ensures blogs update instantly for all users.</span>
          </div>}
          <br /><br /><br />

          <button className={styles.featureButton} onClick={() => togglePopover(setPopover5)}> . . . . Empowering creativity </button>
          {popover5 && <div className={`${styles.popoverContent} ${styles.popoverVisible}`}>
            <span>Once logged in, users can effortlessly create, post, and delete blogs. It's a user-friendly space to share thoughts and ideas!.</span>
          </div>}
          <br /><br /><br />

          <button className={styles.featureButton} onClick={() => togglePopover(setPopover6)}>. . . . . . . . . . . Learning Hub</button>
          {popover6 && <div className={`${styles.popoverContent} ${styles.popoverVisible}`}>
            <span>Users can read the blog and increase their knowledge.</span>
          </div>}
        </div>
      </section>

      {/* <section className={styles.teamSection}>
        <h1 className={styles.teamTitle}>Meet our Team</h1>
        <div>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <h2 className={styles.teamMemberName}>Aditi Gaikwad</h2>
            </div>
            <div className={styles.teamMember}>
              <h2 className={styles.teamMemberName}>Vaibhav Vanage</h2>
            </div>
            <div className={styles.teamMember}>
              <h2 className={styles.teamMemberName}>Shivam Musterya</h2>
            </div>
          </div>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <h2 className={styles.teamMemberName}>Dhruv Sheth</h2>
            </div>
            <div className={styles.teamMember}>
              <h2 className={styles.teamMemberName}>Aryan Surve</h2>
            </div>
            <div className={styles.teamMember}>
              <h2 className={styles.teamMemberName}>Farin Khan</h2>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  </>
  )
}

export default About;

