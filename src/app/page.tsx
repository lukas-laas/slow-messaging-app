import { getAllMessages } from "@/queries";
import MessageForm from "./_components/message-form";
import LogOut from "./_components/log-out";

export default async function Home() {
  const messages = await getAllMessages();

  return (
    <main>
      <h1>Slow-messaging</h1>
      <LogOut />
      {messages.length ? (
        messages.map((message) => (
          <p key={message.id}>
            <strong>{message.username}: </strong>{" "}
            {message.message
              ? message.message
              : `Message available at ${new Date(
                  message.time + 3600000
                ).toLocaleTimeString()}`}{" "}
            - {message.time.toLocaleTimeString()}
          </p>
        ))
      ) : (
        <>No messages</>
      )}
      <MessageForm />
    </main>
  );
}
