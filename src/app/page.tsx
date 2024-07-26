import { getAllMessages } from "@/queries";

export default async function Home() {
  const messages = await getAllMessages();

  return (
    <main>
      <h1>Slow-messaging</h1>
      {messages.length ? (
        messages.map((message) => (
          <p key={message.id}>
            <strong>{message.username}: </strong> {message.message} -{" "}
            {message.time.toLocaleTimeString()}
          </p>
        ))
      ) : (
        <>No messages</>
      )}
      <form action="">
        <input type="text" placeholder="Message" />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
