"use server"
import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function setRole(formdata: FormData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role != "admin") {
    throw new Error("Not Authorized");
  }

  const client = await clerkClient();
  const id = formdata.get("id") as string;
  const role = formdata.get("role") as string;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to set user as admin")
  }
}


export async function deleteRole(formdata: FormData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role != "admin") {
    throw new Error("Not Authorized");
  }

  const client = await clerkClient();
  const id = formdata.get("id") as string;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role: null },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to set user as admin")
  }
}