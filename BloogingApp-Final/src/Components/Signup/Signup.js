import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import InputControl from "../InputControl/Inputcontrol";
import { auth } from "../../firebaseinit";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from "./Signup.module.css";
import NavBar from "../NavBar/NavBar";
const provider = new GoogleAuthProvider();

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  //google
  const signUpwithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      // const user = result.user;
      toast.success("SignUp Successfully")

      navigate("/");

    }).catch((error) => {
      console.log("error in sign in");
      toast.error("Error in SignUp")

      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // // ...
    });
  }

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    //function to create a user in firebase - return promise
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {

        setSubmitButtonDisabled(false);
        const user = res.user;
        // console.log(user);
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.innerBox}>
          <h1 className={styles.head2}>SignUp</h1>

          <InputControl
            label="Name"
            placeholder="Enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <InputControl
            label="Email"
            placeholder="Enter email address"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <InputControl
            label="Password" type="password"
            placeholder="Enter password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />

          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button type="button" onClick={handleSubmission} disabled={submitButtonDisabled} className={styles.btn}>
              SignUp
            </button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </p>
            <p className={styles.center}>Or</p>
            <button type="button" className={styles.loginwithgooglebtn} onClick={signUpwithGoogle}>
              Sign in with Google
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;