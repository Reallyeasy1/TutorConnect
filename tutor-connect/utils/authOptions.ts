import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Sign in",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "hello@example.com",
				},
				password: { label: "Password", type: "password" },
				typeOfTutor: { label: "typeOfTutor", type: "typeOfTutor" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				let user;

				if (credentials?.typeOfTutor) {
					user = await prisma.tutor.findUnique({
						where: {
							email: credentials.email,
						},
					});
				} else {
					user = await prisma.client.findUnique({
						where: {
							email: credentials.email,
						},
					});
				}

				if (!user) {
					return null;
				}

				if (!user.active) {
					throw new Error("User is not active");
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					return null;
				}

				return {
					id: user.id + "",
					email: user.email,
					name: user.name,
					randomKey: credentials?.typeOfTutor ? "tutor" : "client",
					image: user.image,
				};
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			console.log("Session Callback", { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					randomKey: token.randomKey,
				},
			};
		},
		jwt: ({ token, user }) => {
			console.log("JWT Callback", { token, user });
			if (user) {
				const u = user as unknown as any;
				token.id = u.id;
				token.name = u.name;
				token.email = u.email;
				token.randomKey = u.randomKey as string;
			}
			return token;
		},
	},
};