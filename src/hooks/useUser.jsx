import { useState, useEffect } from "react";
import { useToken } from "./useToken";
import jwt from "jwt-decode";

const useUser = () => {
  const [token] = useToken();

  const getUser = (token) => {
    return jwt(token);
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getUser(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getUser(token));
    }
  }, [token]);

  return [user, setUser];
};

export default useUser;
