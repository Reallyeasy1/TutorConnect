import type { Metadata } from "next"
import "./globals.css";
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "TutorConnect",
  description: "TutorConnect is a platform that connects tutors and students.",
   icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}