import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/services/api-sdk/models/user/user";
const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        const accessToken = await login({ username, password });
        return accessToken
          ? {
              id: username,
              name: username,
              accessToken,
            }
          : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
  debug: process.env.NODE_ENV !== "production",
};
export default authOptions;
