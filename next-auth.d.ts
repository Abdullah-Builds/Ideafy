import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string;
    user?: {
      name?: string;
      email?: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
