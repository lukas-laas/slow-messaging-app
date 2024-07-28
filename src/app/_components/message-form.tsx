import { postMessage } from "@/queries";

export default function MessageForm() {
  return (
    <form
      action={postMessage}
      method="POST"
      className="flex flex-row w-full gap-2 p-2"
    >
      <input
        type="text"
        placeholder="Message"
        name="message"
        className="border border-solid border-neutral-400 w-full rounded-md p-1"
      />
      <button
        type="submit"
        className="bg-green-400 hover:bg-green-300 rounded-md p-1 transition-colors"
      >
        Send
      </button>
    </form>
  );
}
