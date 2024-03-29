"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn, getSession } from "next-auth/react";

function RegisterPage() {
  const router = useRouter();

  const usrsModel = {
    email: String(),
    password: String(),
  };

  const [newUser, setNewUser] = useState(usrsModel);
  const [error, setError] = useState(String());

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
    console.log(newUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInM(newUser);
    setNewUser(usrsModel);
  };

  const signInM = async (user) => {
    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    if (res.error) {
      return setError(res.error);
    }
    const session = await getSession();
    if (res.ok && session) {
      console.log(session.user);
      if (session.user.rol === "adm") {
        router.push("/dashboard/adm");
      } else if (session.user.rol === "usr") {
        router.push("/dashboard/usr");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <h1 style={{ color: "blue" }}>Sign In</h1>
        <br />

        <input
          type="email"
          placeholder="someemail@gmail.com"
          name="email"
          onChange={handleChange}
          value={newUser.email}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            width: "300px",
            boxSizing: "border-box",
            color: "black",
          }}
        />
        <br />
        <input
          type="password"
          placeholder="********"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            width: "300px",
            boxSizing: "border-box",
            color: "black",
          }}
        />
        <br />

        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
