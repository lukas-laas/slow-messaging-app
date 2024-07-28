import { postMessage } from "@/queries";
import FetchButton from "./fetch-button";

export default function MessageForm() {
  return (
    <form
      action={postMessage}
      className="flex flex-row w-full gap-2 p-2 items-center border-t border-solid border-neutral-400"
    >
      <input
        type="text"
        placeholder="Message"
        name="message"
        className="border border-solid border-neutral-400 w-full p-1 rounded-md"
      />
      <FetchButton />
      <button
        type="submit"
        className="bg-green-400 hover:bg-green-300 rounded-md p-1 transition-colors"
      >
        Send
      </button>
    </form>
  );
}
