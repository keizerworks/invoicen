"use server";

import { cookies as getCookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookies = await getCookies();
  cookies.delete("access_token");
  cookies.delete("refresh_token");

  redirect("/");
}
