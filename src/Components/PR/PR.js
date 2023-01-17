import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const PR = ({ Component }) => {
  const [getUserType, setGetUserType] = useState(null);
  const { localUser } = useAuth();
  const navigate = useNavigate();
  const getUser = async () => {
    const querySnapshot = await getDocs(collection(db, "userInformation"));
    querySnapshot.forEach((doc) => {
      if (doc.data().uid === localUser.uid) {
        setGetUserType(doc.data().userType);
        if (doc.data().userType === "Bidder") {
          navigate("/");
        }
      }
    });
  };

  useEffect(() => {
    if (localUser) {
      getUser();
    }
  }, [localUser]);

  return (
    <>
      <Component />
    </>
  );
};

export default PR;
