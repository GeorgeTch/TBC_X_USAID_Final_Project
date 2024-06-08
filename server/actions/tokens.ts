"use server";

import { db } from "..";
import { eq } from "drizzle-orm";
import { emailTokens } from "../schema";

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
