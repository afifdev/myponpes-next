import { useContext } from "react";
import { UserContext } from "./useUser";
import Home from "@pages/index";
import Layout from "@components/Layout";

const withAuth = (Component, role) => {
  const Auth = (props) => {
    const user = useContext(UserContext);
    if (!user.isDone) {
      return (
        <Layout>
          <div>Loading...from withAuth</div>
        </Layout>
      );
    } else if (user.role === 3 && role === "admin") {
      return <Component {...props} />;
    } else if (user.role === 2 && role === "teacher") {
      return <Component {...props} />;
    } else if (user.role === 1 && role === "santri") {
      return <Component {...props} />;
    } else {
      return <Home />;
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
