import React, { useEffect, useState } from "react";
import styles from "./Notification.module.css";
import { useNavigate } from "react-router-dom";

const NotificationIcon = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={styles.bell_notification}
        current-count="0"
        onClick={() => navigate("/notification")}
      >
        <i
          className="fa-solid fa-bell"
          style={{ fontSize: "25px", color: "#45f3ff" }}
        ></i>
      </div>
    </>
  );
};

export default NotificationIcon;
