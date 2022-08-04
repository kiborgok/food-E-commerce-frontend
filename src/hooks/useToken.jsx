import { useState } from "react";

export const useToken = () => {
  const [token, setTokenStore] = useState(() => localStorage.getItem("token"));

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenStore(newToken);
  };

  return [token, setToken];
};
