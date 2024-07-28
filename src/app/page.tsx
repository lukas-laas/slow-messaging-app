import { getAllMessages } from "@/queries";
import MessageForm from "./_components/message-form";
import LogOut from "./_components/log-out";
import { getSession } from "@/auth";
import FetchButton from "./_components/fetch-button";

export default async function Home() {
  const messages = await getAllMessages();
  const session = await getSession();
  return (
    <main className="flex flex-col max-h-screen h-full max-w-lg mx-auto shadow-md">
      <nav className="flex justify-between p-2 border-b border-solid border-neutral-400">
        <h1 className="text-xl">{session.user}</h1>
        <LogOut />
      </nav>
      <ul className="h-max overflow-y-auto flex flex-col h-full gap-2 p-2 bg-white">
        {messages && messages.length ? (
          messages.map((message) => (
            <li
              key={message.id}
              className={`${
                message.username == session.user ? "self-end" : ""
              } bg-green-400 max-w-72 p-2 rounded-md`}
            >
              <strong>{message.username} </strong>
              {message.time.toLocaleTimeString()}
              <br />
              {message.message
                ? message.message
                : `Message available at ${new Date(
                    message.time.getTime() + 3600000
                  ).toLocaleTimeString()}`}
            </li>
          ))
        ) : (
          <>No messages</>
        )}
      </ul>
      <div className="w-full bottom-0">
        <MessageForm />
      </div>
    </main>
  );
}
