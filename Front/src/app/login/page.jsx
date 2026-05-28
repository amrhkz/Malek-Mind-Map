"use client";
import React, { useState } from "react";
import "./login.css";
import { useRouter } from "next/navigation";

const Login = async () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email , password}),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        showOscar("برات یه کد فرستادم برو چکش کن");
      } else {
        showOscar("I Cant send Code to You :(");
      }
    } catch (err) {
      console.error(err);
    }
    // try {
    //   // await login(email, password);
    //   router.push("/");
    // } catch {
    //   alert("خطا در ورود");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={submit}>
        <h1>Login Form</h1>
        <hr />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading}>{loading ? "Loading" : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
