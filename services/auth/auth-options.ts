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
        const { email, password } = credentials;
        console.log("Authorize credentials:", credentials);
        const accessToken = await login({ email, password });
        console.log("access_token:",accessToken);
        return accessToken
          ? {
              id: email,
              name: email,
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
