"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";

function DashboardPage() {
  const { data: session, status } = useSession();

  console.log(session, status);
  
  const sessionData = session ? session.user : "";

  return (
    <div>
      <h1>DashboardPage</h1>
      <h2>{sessionData.fullname}</h2>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Signout
      </button>
    </div>
  );
}

export default DashboardPage;
