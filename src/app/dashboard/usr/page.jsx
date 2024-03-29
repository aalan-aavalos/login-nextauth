"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";

function UsrPage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  // Verifica si session está definido antes de acceder a session.user.fullname
  const sessionData = session ? session.user : {};

  return (
    <div>
      <h1>UsrPage</h1>
      <h1>{sessionData.fullname}</h1>
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

export default UsrPage;
