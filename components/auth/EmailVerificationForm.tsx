"use client";

import { newVerification } from "@/server/actions/tokens";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AuthCard from "./AuthCard";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";

export default function EmailVerificationForm() {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("NO token found");
      return;
    }

    newVerification(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);
  return (
    <AuthCard
      cardTitle="Verify your account"
      backBtnHref="/auth/login"
      backBtnLabel="Back to login"
    >
      <div className="">
        <p>{!success && !error ? "Verifying Email..." : null}</p>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>
  );
}
