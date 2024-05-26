//TODO: Change to Home page
// import { getServerSession } from 'next-auth'
// import { authOptions } from './api/auth/[...nextauth]/route'
// import { LoginButton, LogoutButton } from './auth'
// import { User } from './user'

// export default async function Home() {
//   const session = await getServerSession(authOptions)

//   return (
//     <main>
//       <LoginButton />
//       <LogoutButton />
//       <h2>Server Session</h2>
//       <pre>{JSON.stringify(session)}</pre>
//       <h2>Client Call</h2>
//       <User />
//     </main>
//   )
// }

import Link from "next/link";
import { Form as LoginForm } from './form'

export default function LoginPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-navy-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
                <h1 className="font-semibold text-2xl">Log In</h1>
                <LoginForm />
                <p className="text-center">
                    Need to create an account?{' '}
                    <Link className="text-indigo-500 hover:underline" href="/register">
                        Create Account
                    </Link>{' '}
                </p>
            </div>
        </div>
    )
}