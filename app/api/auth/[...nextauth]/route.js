import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { redirect } from "next/navigation";

export const Options = {
  session: {
    maxAge: 1800,
  },
  pages: {
    signIn: "/login",
    error:"/login"
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: "credentials",
        password: "Credentials",
      },
      async authorize(credentials, req) {
        //
        try {
          const user = await prisma.User.findUnique({
            where: { username: credentials.username },
          });
          if (user) {
            //checkpass
            if (user.password === credentials.password) {
              return {
                name: user.username,
              };
            } else {
              throw new Error("Your username or password is incorrect");
            }
          } else {
            throw new Error("Your username or password is incorrect");
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
};
export const handler = NextAuth(Options);

export { handler as GET, handler as POST };
