import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "@components/Layout";
import { UserContext } from "@utils/useUser";

export default function Login() {
  const user = useContext(UserContext);
  const [role, setRole] = useState(0);
  const [showRole, setShowRole] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const handleLogin = async () => {
    try {
      setError(0);
      const { data } = await axios.post("/api/login", {
        username,
        password,
        role: role + 1,
      });
      if (data.error) {
        setError(1);
        setErrorMsg(data.error);
      } else {
        user.setUsername(username);
        user.setToken(data.data.token);
        user.setRole(role + 1);
        localStorage.setItem("myponpestoken", data.data.token);
        Router.push("/");
      }
    } catch (err) {
      console.log("Error");
    }
  };

  const handleRoleChange = (e) => {
    setRole(e ? e : 0);
    setShowRole(!showRole);
  };

  const handleShowRole = (e) => {
    setShowRole(!showRole);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user.role) {
      setTimeout(() => {
        if (user.role === 1) {
          Router.push("/user/dashboard");
        } else if (user.role === 2) {
          Router.push("/admin/dashboard");
        }
      }, 1000);
    }
  }, [user.role]);

  return (
    <Layout>
      <Head>
        <title>Sign In | MyPonpes</title>
      </Head>
      {user.isDone && !user.role ? (
        <div className="flex h-screen max-h-screen overflow-hidden">
          <div className="p-8 sm:p-16 w-100">
            <p className="text-xl sm:text-3xl font-bold">Sign in to MyPonpes</p>
            <p className="sm:whitespace-nowrap sm:text-lg pt-2">
              Please enter your username and password to proceed
            </p>
            <div className="py-8 space-y-4">
              {error ? (
                <div className="py-1 px-4 rounded-md bg-red-500 text-white">
                  {errorMsg}
                </div>
              ) : (
                ""
              )}
              <div>
                <label htmlFor="username">Username</label>
                <br />
                <input
                  type="text"
                  value={username}
                  onChange={handleUsername}
                  name="username"
                  className="font-medium py-1 px-4 rounded-md border-2 bg-gray-50 focus:border-blue-600 outline-none"
                  placeholder="Your Username"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  name="password"
                  className="font-medium py-1 px-4 rounded-md border-2 bg-gray-50 focus:border-blue-600 outline-none"
                  placeholder="Your Password"
                />
              </div>
              <button
                onClick={handleShowRole}
                className="font-medium py-1 px-4 rounded-md border-2 focus:border-blue-500 outline-none focus:outline-none inline-flex items-center"
              >
                {role ? "Admin" : "Santri"}
                <span className="pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`${
                  showRole ? "visible" : "invisible"
                } flex flex-col rounded-md border-2 w-min px-1`}
              >
                <button
                  onClick={() => handleRoleChange(0)}
                  className="font-medium py-1 px-4 rounded-md my-1 hover:text-white hover:bg-blue-600 focus:outline-none"
                >
                  Santri
                </button>
                <button
                  onClick={() => handleRoleChange(1)}
                  className="font-medium py-1 px-4 rounded-md my-1 hover:text-white hover:bg-blue-600 focus:outline-none"
                >
                  Admin
                </button>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="font-medium py-1.5 px-4 rounded-md bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-offset-1 focus:ring-blue-700 outline-none focus:outline-none text-white"
            >
              Sign In
            </button>
          </div>
          <div
            className="w-full h-screen bg-cover hidden sm:block"
            style={{ backgroundImage: `url('assets/images/santri.jpeg')` }}
          ></div>
        </div>
      ) : (
        <div>Loading... from Login</div>
      )}
    </Layout>
  );
}
