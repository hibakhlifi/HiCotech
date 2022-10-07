import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useLocalStorage from "../../Hooks/useLocalStorage";

const Logout = () => {
  const history = useHistory();
  const [token, setToken] = useLocalStorage("token", null);
  useEffect(() => {
    if (!token) {
      history.push("/");
    }
    setToken(null);
  }, [token]);
  return null;
};

export default Logout;
