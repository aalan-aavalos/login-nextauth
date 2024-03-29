"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

function AdmPage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  // Verifica si session está definido antes de acceder a session.user.fullname
  const sessionData = session ? session.user : "";

  return (
    <div>
      <h1>AdmPage</h1>
      {/* Utiliza fullName en lugar de session.user.fullname */}
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

export default AdmPage;
