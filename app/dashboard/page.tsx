import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashBoard() {
  const authObj = await auth();
  const userObj = await currentUser();
  console.log(authObj, userObj);
  return (
    <div></div>
  );
}