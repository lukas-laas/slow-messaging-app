"use server";
import { getUsersStats } from "@/queries";

export default async function Statistics() {
  const users = await getUsersStats();

  return (
    <>
      <h1>User statistics</h1>
      <table>
        <thead>
          <tr>
            <th className="border border-black p-1">Username</th>
            <th className="border border-black p-1">Sent</th>
            <th className="border border-black p-1">Sent / fetch</th>
            <th className="border border-black p-1">New / fetch</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.username}>
                <td className="border border-black">{user.username}</td>
                <td className="border border-black">{user.messages}</td>
                <td className="border border-black">{user.sentPerFetch}</td>
                <td className="border border-black">{user.newMessages}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
