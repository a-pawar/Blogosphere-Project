
import React from "react";
import styles from "./contact.module.css";
// import { ScrollToTop } from "../../misc/ScrollToTop";
import { Container } from "reactstrap";
import toast from "react-hot-toast";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { authContext } from "../../Context";
import { Toaster } from "react-hot-toast";

const Contact = () => {
  const name = useContext(authContext);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("log handle called");
    toast.success("Email Sent!! We will get back to you soon.");


  }
  return (
    <>
      {/* <ScrollToTop /> */}
      <Toaster />
      <NavBar name={name} />
      <section className={`${styles.common__section}`}>
        <Container >
          <h1 className={`${styles.color} `}>Contact Us</h1>
          <h5 className={`${styles.customStyles}`}>Get Helps & Friendly Support</h5>
        </Container>
      </section>



      <section className={`${styles.contact}`}>
        <div className={`${styles.container}`}>
          <form className={`${styles.shadow}`} onSubmit={handleSubmit}>
            <h4 className={`${styles.heading}`}>Fillup The Form</h4> <br />
            <div className={`${styles.contactdiv}`}>
              <input type='text' placeholder='Name' className={`${styles.contactdivinput}`} required />
              <input type='text' placeholder='Email' required />
            </div>
            <input type='text' placeholder='Subject' required />
            <textarea cols='30' rows='10' type='text' placeholder='Description'></textarea>
            <div style={{ width: "100%" }}>
              <button style={{
                fontSize: "17px", margin: 'auto',
                backgroundColor: "#0f172a",
                borderRadius: "15px",
                color: "white",
                padding: "10px",
                cursor: "pointer"

              }}
              >Submit Request</button>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

export default Contact