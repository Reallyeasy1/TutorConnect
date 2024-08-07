"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const Form = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/client/post_assignments";
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [submit, setSubmit] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmit(true);
		try {
			const res = await signIn("credentials", {
				redirect: false,
				email,
				password,
				callbackUrl,
			});

			if (!res?.error) {
				const response = await fetch("/api/client/getClientDetails", {
					method: "POST",
					body: JSON.stringify({ email }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				const data = await response.json();
				/*
        let account = {token: data?.id}
        // Need to discuss on what seed to sign for jwt 
          const SECRET = "this is a secret";
        const token = jwt.sign(account, SECRET);
*/
				if (data?.id) {
					// Strapi portion (migrated to register)
					/* // Parameters for Strapi
          const strapiData = {
            data: {
              id: data.id,
              username: data.name,
              email: email,
              token: token,
            },
          };



          // Fetch Strapi API key from environment variable
        //   const strapiApiKey = process.env.STRAPI_API_KEY;

          // Pass in Strapi_API_Key
          const strapiResponse = await fetch("http://localhost:1337/api/accounts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(strapiData),
          });

          if (!strapiResponse.ok) {
            throw new Error("Failed to upload to Strapi");
          }

          const strapiResponseData = await strapiResponse.json();
          console.log(strapiResponseData); // Outputs the result
          console.log("Upload to Strapi success");
          */
					window.location.href = `/client/${data.id}/assignment/client_assignment`;
				} else {
					setError("Failed to retrieve user information");
					setSubmit(false);
				}
			} else {
				setError("Invalid email or password");
				setSubmit(false);
			}
		} catch (err) {
			setError("An error occurred during login");
			setSubmit(false);
			console.error(err);
		}
	};

	const blueButton = {
		backgroundColor: "#5790AB",
		color: "#fff",
		font: "Poppins",
		fontWeight: "bold",
		fontSize: "16px",
		width: "100%",
		marginTop: "10px",
	};

	return (
		<form onSubmit={onSubmit} className="space-y-4 w-full sm:w-[400px]">
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="email">Email</Label>
				<Input required value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" />
			</div>
			<div className="grid w-full items-center gap-1.5">
				<Label htmlFor="password">Password</Label>
				<Input required value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
			</div>
			{error && <Alert>{error}</Alert>}
			<div className="w-full">
				<Button style={blueButton} disabled={submit}>{submit ? <><Spinner /> Logging in...</> : "Log in"}</Button>
			</div>
		</form>
	);
};
