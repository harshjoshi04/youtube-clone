import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "388561009419-qmpmj1dm5denl13vpbgcbenfhidvot1j.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "bankiasupersaiyansunnikasagemode",

  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
