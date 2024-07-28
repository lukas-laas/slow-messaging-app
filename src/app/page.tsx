import { getAllMessages } from "@/queries";
import MessageForm from "./_components/message-form";
import LogOut from "./_components/log-out";
import { getSession } from "@/auth";

export default async function Home() {
  const messages = await getAllMessages();
  const session = await getSession();

  return (
    <main className="flex flex-col">
      <h1>Slow-messaging</h1>
      <LogOut />
      {messages.length ? (
        messages.map(
          (message) =>
            message && (
              <p
                key={message.id}
                className={message.username == session.user ? "self-end" : ""}
              >
                <strong>{message.username}: </strong>
                <br />
                {message.message
                  ? message.message
                  : `Message available at ${new Date(
                      message.time.getTime() + 3600000
                    ).toLocaleTimeString()}`}{" "}
                - {message.time.toLocaleTimeString()}
              </p>
            )
        )
      ) : (
        <>No messages</>
      )}
      <MessageForm />
    </main>
  );
}
