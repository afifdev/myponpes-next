import axios from "axios";
import jwt from "jsonwebtoken";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState(0);

  useEffect(async () => {
    const systemToken = localStorage.getItem("myponpestoken");
    if (!systemToken) {
      return;
    }
    try {
      const user = await jwt.decode(systemToken, process.env.JWT_SECRET);
      const { data } = await axios.post("/api/login", user);
      if (data.error) {
        localStorage.removeItem("myponpestoken");
        console.log("initial login error");
      } else {
        setUsername(user.username);
        setToken(data.data.token);
        setRole(user.role);
      }
      console.log("initial login success");
    } catch (e) {
      localStorage.removeItem("myponpestoken");
      console.log("error calling api to start context");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        token,
        setToken,
        role,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
