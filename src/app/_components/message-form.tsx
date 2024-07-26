import { postMessage } from "@/queries";

export default function MessageForm() {
  return (
    <form action={postMessage} method="POST">
      <input type="text" placeholder="Message" name="message" />
      <button type="submit">Send</button>
    </form>
  );
}
