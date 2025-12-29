'use server';

import { createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { ID, Client, Account } from "node-appwrite";
import { redirect } from "next/navigation";

async function createAuthClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    const { account } = await createAuthClient();

    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error: any) {
    console.error('SignUp Error:', error);
    throw new Error(error.message || 'Failed to create account. Please try again.');
  }

  redirect("/");
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const { account } = await createAuthClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error: any) {
    console.error('SignIn Error:', error);
    throw new Error(error.message || 'Invalid email or password. Please try again.');
  }

  redirect("/");
}

export async function signOut() {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
  } catch (error) {
    // Ignore error if session is already invalid
  }
  
  (await cookies()).delete("appwrite-session");

  redirect("/login");
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
