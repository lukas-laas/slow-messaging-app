import { getAllMessages } from "@/queries";
import MessageForm from "./_components/message-form";

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
      <MessageForm />
    </main>
  );
}
