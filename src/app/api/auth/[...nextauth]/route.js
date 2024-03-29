import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongoose";
import User from "@/models/user";
import bcript from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@domain.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials, req) {
        await connectDB();
        const userFound = await User.findOne({
          email: credentials.email,
        }).select("+password");
        if (!userFound) {
          throw new Error("Invalid credentials");
        }
        const passwordMatch = await bcript.compare(
          credentials.password,
          userFound.password
        );
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }
        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async signIn({ user }) {
      // Aquí puedes hacer lo que quieras con los datos de la sesión
      console.log("Datos de la sesión:", { user });
      return true; // Continuar con el inicio de sesión
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
