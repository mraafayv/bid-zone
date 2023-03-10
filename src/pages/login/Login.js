import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useSignin } from "../../hooks/useSignin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { localUser } = useAuth();
  // console.log(localUser)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, error, isPending } = useSignin();
  const navigate = useNavigate();

  useEffect(() => {
    if (localUser) {
      navigate("/");
    }
  }, [localUser]);

  const handleSignin = (e) => {
    e.preventDefault();
    signin(email, password);
    setEmail("");
    setPassword("");

    // navigate("/");
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.box}>
        <div className={styles.form}>
          <form onSubmit={handleSignin}>
            <h2>Sign in</h2>
            <div className={styles.inputbox}>
              <span>Email</span>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className={styles.inputbox}>
              <span>Password</span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <p className={styles.detail}>
              Don't have an account?
              <Link to="/signup">
                <span className={styles.link}>signup</span>
              </Link>
            </p>

            {!isPending && <button className={styles.login_btn}>Login</button>}
            {isPending && (
              <button className={styles.login_btn}>loading......</button>
            )}
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
