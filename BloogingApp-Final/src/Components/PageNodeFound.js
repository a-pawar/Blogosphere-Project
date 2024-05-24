import styles from "./Contact/contact.module.css";
import NavBar from "./NavBar/NavBar";
import { useContext } from "react";
import { authContext } from "../Context";

export default function PageNotFound() {
  const uid = useContext(authContext);
  return (<>
    <NavBar uid={uid} />
    <div className={styles.center}>
      <div>
        <h1 >404 Page Not Found</h1>
      </div>
    </div>
  </>
  );

}