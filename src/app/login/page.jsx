"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";

function RegisterPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  // Verifica si session está definido antes de acceder a session.user.fullname
  const sessionData = session ? session.user : {};

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
    await singIn(newUser);
    setNewUser(usrsModel);
  };

  const singIn = async (user) => {
    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    if (res.error) {
      return setError(res.error);
    }

    if (res.ok) {
      console.log(res.user);

      if (sessionData.rol === "adm") {
        return router.push("/dashboard/adm");
      } else {
        return router.push("/dashboard/usr");
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
