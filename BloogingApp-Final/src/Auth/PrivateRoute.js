import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { authContext } from "../Context";


const PrivateRoute = ({ Component }) => {
  const id = useContext(authContext);

  const [uid, setUid] = useState(id);

  return uid ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;