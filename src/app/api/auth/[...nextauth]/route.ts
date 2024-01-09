import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { authOptions } from "@/utils/auth"

const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}  //it is done because we are using get method for getting session and post for authentication