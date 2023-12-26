import React from "react";
import Form from "./Form";
import Home from "../Home";

export default function Auth() {
  const isSignInPage = window.location.pathname.includes("signin");
  return (
    <>
      <Form isSignInPage={isSignInPage} />
    </>
  );
}
