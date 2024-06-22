"use server";

import getBaseUrl from "@/lib/base-url";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_APIKEY);
const domain = getBaseUrl();

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Handmade Georgia <handmadegeorgia@resend.dev>",
    to: email,
    subject: "Handmadegeorgia.store - Confirmation Email",
    html: `<p>Click to <a href=${confirmLink}> confirm your email </a></p>`,
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
    return data;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Handmade Georgia <handmadegeorgia@resend.dev>",
    to: email,
    subject: "Handmadegeorgia.store - Confirmation Email",
    html: `<p>Click to <a href=${confirmLink}> Reset your password</a></p>`,
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
    return data;
  }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: "Handmade Georgia <handmadegeorgia@resend.dev>",
    to: email,
    subject: "Handmadegeorgia.store - Confirmation Email",
    html: `<p>Your Confirmation Code: ${token}</p>`,
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
    return data;
  }
};
