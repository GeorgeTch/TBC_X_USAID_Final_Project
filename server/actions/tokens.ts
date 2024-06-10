"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { emailTokens, passwordResetTokens, users } from "../schema";
import { error } from "console";

export const getEmailVerificationToken = async (email: string) => {
  try {
    const verificationToken = await db.query.emailTokens.findFirst({
      where: eq(emailTokens.token, email),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getEmailVerificationToken(email);

  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(emailTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return verificationToken;
};

export const newVerification = async (token: string) => {
  const existingToken = await getEmailVerificationToken(token);
  if (!existingToken) return { error: "Token not found" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });
  if (!existingUser) return { error: "Email does not exist" };

  await db.update(users).set({
    emailVerified: new Date(),
    email: existingToken.email,
  });

  await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  return { success: "Email Verified" };
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.email, email),
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    //Hour Expiry
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
      await db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id));
    }
    const passwordResetToken = await db
      .insert(passwordResetTokens)
      .values({
        email,
        token,
        expires,
      })
      .returning();
    return passwordResetToken;
  } catch (e) {
    return null;
  }
};