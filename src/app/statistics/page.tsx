import { getUsersStats } from "@/utils";

export default async function Statistics() {
  const users = await getUsersStats();

  return (
    <>
      <h1>User statistics</h1>
      <table>
        <tr>
          <th className="border border-black p-1">Username</th>
          <th className="border border-black p-1">Sent</th>
          <th className="border border-black p-1">Sent / fetch</th>
          <th className="border border-black p-1">New / fetch</th>
        </tr>
        {users.map((user) => (
          <tr>
            <td className="border border-black">{user.username}</td>
            <td className="border border-black">{user.messages}</td>
            <td className="border border-black">{user.sentPerFetch}</td>
            <td className="border border-black">{user.newMessages}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
