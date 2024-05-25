/**
 * The Home function in this TypeScript React code fetches the server session using next-auth and
 * displays login/logout buttons along with user information.
 * @returns The `Home` component is returning a main section with the following elements:
 * 1. A `LoginButton` component.
 * 2. A `LogoutButton` component.
 * 3. A heading `<h2>` with the text "Server Session".
 * 4. A `<pre>` element displaying the JSON stringified `session` object.
 * 5. Another heading `<h2>` with the text "Client Call".
 */
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from './auth'
import { User } from './user'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
    </main>
  )
}