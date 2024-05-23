import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function SuccessPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-[350px]" >
                <CardHeader>
                    <CardTitle className="text-center">Password Reset</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-center">An email has been sent to your email address with instructions to reset your password.</CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-2">
                    <Button className="w-full" asChild>
                        <Link href="/client/login">Back to Login</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}