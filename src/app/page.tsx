import MessageForm from "./_components/message-form";
import NavBar from "./_components/navbar";

export default async function Home() {
  return (
    <main className="flex flex-col max-h-screen h-full max-w-lg mx-auto shadow-md">
      <NavBar />
      <div className="w-full bottom-0">
        <MessageForm />
      </div>
    </main>
  );
}
