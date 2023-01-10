import React, {
    Children,
    createContext,
    useReducer,
    useState,
    useEffect,
  } from "react";
  export const AuthContext = createContext();
  
  const ContextProvier = ({ children }) => {
    const [localUser, setLocalUser] = useState("");
    return (
      <AuthContext.Provider value={{ localUser, setLocalUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default ContextProvier;
  