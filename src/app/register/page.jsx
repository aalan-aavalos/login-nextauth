"use client";

import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

function RegisterPage() {
  const router = useRouter();

  const usrsModel = {
    email: String(),
    password: String(),
    fullname: String(),
  };

  const [newUser, setNewUser] = useState(usrsModel);
  const [error, setError] = useState(String());

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
    console.log(newUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUser(newUser);
    setNewUser(usrsModel);
  };

  const createUser = async (user) => {
    try {
      const response = await axios.post("/api/auth/singup", user);
      const data = await response.data;

      // Esto es para que cuando se registre inicie sesion
      const res = await signIn("credentials", {
        email: data.email,
        password: newUser.password,
        redirect: false,
      });

      console.log("bien", data);

      if (res.ok) {
        return router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <h1 style={{ color: "blue" }}>Sign Up</h1>
        <br />

        <input
          type="text"
          placeholder="John Doe"
          name="fullname"
          value={newUser.fullname}
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
        <input
          type="emails"
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
