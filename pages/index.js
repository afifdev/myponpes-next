import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect } from "react";
import Layout from "@components/Layout";
import { UserContext } from "@utils/useUser";

export default function Home() {
  const user = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      if (user.role === 1) {
        Router.push("/user/dashboard");
      } else if (user.role === 2) {
        Router.push("/admin/dashboard");
      } else {
        Router.push("/login");
      }
    }, 1000);
  }, [user.role]);
  return (
    <Layout>
      <Head>
        <title>MyPonpes</title>
      </Head>
      <div>Loading... from Home</div>
    </Layout>
  );
}
