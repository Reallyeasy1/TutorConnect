'use client'

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

/**
 * The Form component renders a login form with email and password fields, and a submit button.
 * It handles form submission using the signIn function from next-auth/react.
 * @return {JSX.Element} The login form component.
 */

export const Form = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/tutor/register' //change
    //const error = searchParams.get('error') ? 'Invalid credentials' : ''
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Attempt to sign in using the signIn function from next-auth/react
        try {
            const res = await signIn('credentials', {
                // Set redirect to false so that we can handle the response ourselves
                redirect: false,
                email, 
                password,
                typeOfTutor: "tutor",
                callbackUrl
            })
            if (!res?.error) {
                // If there is no error, redirect the user to the callback URL
                router.push(callbackUrl)
            } else {
                // If there is an error, set the error state to the error message
                setError('Invalid email or password')
            }
        } catch (err: any) {

        }
        
    }
    return (
        <form onSubmit={onSubmit} className="space-y-4 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    type="email" 
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password" 
                />
            </div>
            {error && <Alert>{error}</Alert>}
            <div className="w-full py-1">
                <Button className="w-full" size="lg">Log in</Button>
            </div>
        </form>
    )
}