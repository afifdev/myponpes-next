import { useContext } from "react";
import { UserContext } from "./useUser";
import Home from "@pages/index";

const withAuth = (Component, role) => {
  const Auth = (props) => {
    const user = useContext(UserContext);
    if (!user.role && user.isDone) {
      return <Home />;
    } else if (user.role === 2 && role === "admin") {
      return <Component {...props} />;
    } else if (user.role === 1 && role === "user") {
      return <Component {...props} />;
    } else {
      return <div>Loading...from withAuth</div>;
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
