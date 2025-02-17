// Import necessary dependencies
import mongoClientPromise from "@/database/mongoClientPromise";
import { userModel } from "@/models/user-model";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

userModel;

// Export the NextAuth configuration and handler
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT, // The database name
  }),

  session: {
    strategy: "jwt", // Session strategy
  },

  trustHost: true, // Fixes UntrustedHost error

  providers: [
    // Credentials Provider for login
    CredentialProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const user = await userModel.findOne({ email: credentials.email });

          if (user) {
            const isMatched = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isMatched) {
              return user; // Return the user if matched
            } else {
              throw new Error("Email or password mismatch");
            }
          } else {
            throw new Error("User Not found");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),

    // Google Provider for authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET, // Secret key for NextAuth
});
