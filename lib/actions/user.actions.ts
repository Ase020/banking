"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

export async function signUp(userData: SignUpParams) {
  const { email, password, firstName, lastName } = userData;
  try {
    // Create a user account
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function signIn({ email, password }: signInProps) {
  try {
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error("Error: ", error);
  }
}

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const loggedInUser = await account.get();
    return parseStringify(loggedInUser);
  } catch (error) {
    return null;
  }
}

export async function logOutUser() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}
