'use client'

import { SessionProvider } from 'next-auth/react'
import NavBar from "./../components/nav-bar/navBar";

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return <div>
<SessionProvider> {children}</SessionProvider></div>
}