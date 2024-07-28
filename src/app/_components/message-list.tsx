import { getSession } from "@/auth";
import { getAllMessages } from "@/queries";

export default async function MessageList() {
  const messages = await getAllMessages();
  const session = await getSession();

  return (
    <ul className="overflow-y-auto flex flex-col h-full gap-2 p-2 bg-white">
      {messages && messages.length ? (
        messages.map((message) => (
          <li
            key={message.id}
            className={`${
              message.username == session.user ? "self-end" : ""
            } bg-green-400 max-w-72 p-2 rounded-md`}
          >
            <div className="text-balance">
              <strong>{message.username} </strong>
              {message.time.toLocaleTimeString()}
              <br />
              {message.message
                ? message.message
                : `Message available at ${new Date(
                    message.time.getTime() + 3600000
                  ).toLocaleTimeString()}`}
            </div>
          </li>
        ))
      ) : (
        <>No messages</>
      )}
    </ul>
  );
}
