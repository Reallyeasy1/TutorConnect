"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StrapiResponseData {
  id: number;
  name: string;
  email: string;
}

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      setError(
        "Your password must be at least 8 characters long, contain at least one number and one special character, and have a mixture of uppercase and lowercase letters."
      );
      return;
    }

    if (contactNumber.length !== 8) {
      setError("Contact number must be 8 digits");
      return;
    }

    if (postalCode.length !== 6) {
      setError("Postal code must be 6 digits");
      return;
    }

    try {
      const res = await fetch("/api/client/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
          contactNumber,
          address,
          postalCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const response = await fetch("/api/client/getClientDetails", {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        // const data = await response.json();
        
        // TODO: Mr Yong Zhe
        const data: StrapiResponseData = await response.json();
      
        if (data?.id) {
          const account = { token: data.id };
          console.log(account)
          let token = ""
          //TODO: Make the secret in environment
          const SECRET = 'This is a secret';
          try {
            token = "a";
            // const token = jwt.sign(account, SECRET);
            // token = account.toString();
            console.log("JWT Token:", token);
          } catch (error) {
            console.error("Error signing JWT:", error);
          }

          const strapiData = {
            data: {
              id: data.id,
              username: data.name,
              email: data.email,
              token: token,
              isTutor: false
            },
          };
console.log(strapiData);
          const strapiResponse = await fetch("http://188.166.213.34/api/accounts", {
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
          
        } else {
          setError("Failed to retrieve user information");
        }
      
        router.push("/client/verify_email?clientId=" + data.id);
      } else {
        const errorResponse = await res.json();
        setError(errorResponse.error);
      }
    } catch (error: any) {
      setError(error.message);
    }

    console.log("Register!");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="name"
        />
      </div>
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contactNumber">Contact Number</Label>
        <Input
          required
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          id="contactNumber"
          type="contactNumber"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Input
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          type="address"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          required
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          id="postalCode"
          type="postalCode"
        />
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          Register
        </Button>
      </div>
    </form>
  );
};
