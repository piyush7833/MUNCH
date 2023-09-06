import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connect";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

declare module "next-auth"{
  interface Session{
    user:User &{
      isShopOwner:Boolean;
    };
  }
}
declare module "next-auth/jwt"{
  interface JWT{
      isShopOwner:Boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_ID as string,
      // clientSecret: process.env.GOOGLE_SECRET as string,
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks:{
    async session({
      token,
      session,
    }){
      if(token){
        session.user.isShopOwner=token.isShopOwner   //store session with an extra condition of isShopOwner
      }
      return session;
    },
    async jwt({
      token
    }){
      const userInDb=await prisma.user.findUnique({
        where:{
          email:token.email!
        }
      })
      token.isShopOwner=userInDb?.isShopOwner!
      return token;
    },
  },
};

export const getAuthSession=()=>getServerSession(authOptions);  //it is used to get user status and data in server side components