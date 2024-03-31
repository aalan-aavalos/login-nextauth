"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

function AdmPage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  const sessionData = session ? session.user : "";

  return (
    <div>
      <h1>AdmPage</h1>
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
