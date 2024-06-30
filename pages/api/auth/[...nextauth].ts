import { signIn, signInWithGoogle } from "@/utils/db/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CreadentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions : NextAuthOptions = {
    // Configure one or more authentication providers
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CreadentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                const user : any = await signIn({ email });
                if (user) {
                    const confirmPassword = await compare(password, user.password);
                    if(confirmPassword) {
                        return user; 
                    }
                    return null;
                } 
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENTID || '',
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
        })
    ],
    callbacks: {
        async jwt({token, account, profile, user} : any) {
            if (account?.provider === "credentials") {
                token.email = user.email;
                token.fullname = user.fullname;
                token.role = user.role;
            } 
            if(account?.provider === "google") {
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: "google",
                }

                await signInWithGoogle(data, (result: any) => {
                    if(result.status) {
                        token.email = result.data.email;
                        token.fullname = result.data.fullname;
                        token.image = result.data.image;
                        token.type = result.data.type;
                        token.role = result.data.role;
                    }
                });
            }
            return token;
        },
        async session({ session, token } : any) {
            if("email" in token) {
                session.user.email = token.email;
            }
            if("fullname" in token) {
                session.user.fullname = token.fullname;
            }
            if("image" in token) {
                session.user.image = token.image;
            }
            if("role" in token) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
} 

export default NextAuth(authOptions)