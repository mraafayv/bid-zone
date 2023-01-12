import React, {
  Children,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";


export const AuthContext = createContext();

const ContextProvier = ({ children }) => {
const auth = getAuth();
const user = auth.currentUser;
  const [localUser, setLocalUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(auth)
      if (user) {
        console.log("authUser" , user)
        setLocalUser(user);
      } else {
        console.log("not logged in")
        setLocalUser(null)
      }
    });
  }, [localUser]);

  return (
    <AuthContext.Provider value={{ localUser, setLocalUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvier;
