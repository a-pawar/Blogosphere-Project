import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import InputControl from "../InputControl/Inputcontrol";
import { auth } from "../../firebaseinit";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";
import NavBar from "../NavBar/NavBar";
const provider = new GoogleAuthProvider();

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  //google
  const signUpwithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      toast.success("Login Successfully")
      navigate("/");

    }).catch((error) => {
      console.log("error in sign in");
      toast.error("Error in Login");
    });
  }
  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Error in Login");
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (<><NavBar />

    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.head2}>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password" type="password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button type="button" disabled={submitButtonDisabled} onClick={handleSubmission} className={styles.btn}>
            Login
          </button>
          <p>
            Don't have account?{" "}
            <span >
              <Link to="/signup" className={styles.grey1}>Sign up</Link>
            </span>
          </p>
          <p className={styles.center}>Or</p>
          <button type="button" className={styles.loginwithgooglebtn} onClick={signUpwithGoogle}>
            Sign in with Google
          </button>

          <ToastContainer />
        </div>
      </div>
    </div>
  </>
  );
}

export default Login;