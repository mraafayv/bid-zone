import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import NotificationIcon from "../../pages/notification/NotificationIcon";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  var { localUser, setLocalUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("run", user.displayName);
    }
  }, [localUser]);
  const handleClick = () => {
    if (isClick) {
      setIsClick(false);
    } else {
      setIsClick(true);
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("successfully logout");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {localUser && (
        <nav>
          <div className={styles.logo}>
            <h2>BidZone</h2>
          </div>
          <div>
            <ul
              className={isClick ? styles.menu_list_active : styles.menu_list}
            >
              <li className={styles.active}>
                <Link to="/"> Home </Link>
              </li>
              <li className={styles.menu_list_item}>
                <Link to="/auction">Auction</Link>
              </li>

              <li className={styles.navbar_name}>
                <p>{localUser.displayName}</p>
              </li>
              <li className={styles.navbar_name}>
                <NotificationIcon />
              </li>
              <li
                className={styles.menu_list_item_img}
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
              >
                <div className={styles.navbar_img}>
                  <img src={localUser.photoURL} alt="" />
                  <ul
                    className={
                      isHovering ? styles.drop_down_hoverOver : styles.drop_down
                    }
                  >
                    <li className={styles.sub_item}>
                      <p>
                        <Link to="/profile"> My Auctions </Link>
                      </p>
                    </li>
                    <li className={styles.sub_item}>
                      <p>
                        <Link to="/profile"> Update Profile </Link>
                      </p>
                    </li>
                    <li className={styles.sub_item} onClick={logout}>
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.humberger}>
            <i
              className={!isClick ? "fa-solid fa-bars" : "fa-solid fa-xmark"}
              onClick={handleClick}
            ></i>
          </div>
        </nav>
      )}
      {!localUser && (
        <nav>
          <div className={styles.logo}>
            <h2>BidZone</h2>
          </div>
          <div>
            <ul
              className={isClick ? styles.menu_list_active : styles.menu_list}
            >
              <li>
                <Searchbar />
              </li>
              <li className={styles.active}>
                <Link to="/"> Home </Link>
              </li>
              <li className={styles.menu_list_item}>
                <Link to="/auction">Auction</Link>
              </li>

              <li className={styles.login_btn}>
                <button onClick={handleLogin}>Login</button>
              </li>
            </ul>
          </div>
          <div className={styles.humberger}>
            <i
              className={!isClick ? "fa-solid fa-bars" : "fa-solid fa-xmark"}
              onClick={handleClick}
            ></i>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
