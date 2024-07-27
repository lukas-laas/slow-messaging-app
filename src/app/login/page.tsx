export default async function Login() {
  return (
    <main>
      <h1>Sign in</h1>
      <form action="">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
