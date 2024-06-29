import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorizing with credentials:", credentials);
        console.log(process.env.NEXT_PUBLIC_LOGIN_USER);
        const res = await fetch(`http://localhost:8000/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        console.log("API Response:", user);

        if (user.error) {
          throw new Error(user.error);
        }

        return user;
      },
    }),
  ],
  session: {
    maxAge: 3600,
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/Cuenta",
  },
};

 
