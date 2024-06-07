"use client";

import AuthCard from "./AuthCard";

export default function LoginForm() {
  return (
    <AuthCard
      cardTitle="Welcome back!"
      backBtnHref="/auth/register"
      backBtnLabel="Create a new account"
      showSocials
    >
      <div>hey</div>
    </AuthCard>
  );
}
