import { getSession } from "@/auth";
import LogOut from "./log-out";

export default async function NavBar() {
  const session = await getSession();

  return (
    <nav className="flex justify-between p-2 border-b border-solid border-neutral-400">
      <h1 className="text-xl">{session.user}</h1>
      <LogOut />
    </nav>
  );
}
