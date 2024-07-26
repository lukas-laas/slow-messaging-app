import { getAllMessages } from "@/queries";

export default async function Home() {
  const messages = await getAllMessages();

  return (
    <main>
      <h1>Slow-messaging</h1>
      {messages.length ? (
        messages.map((message) => <p key={message.id}>{message.message}</p>)
      ) : (
        <>No messages</>
      )}
    </main>
  );
}
