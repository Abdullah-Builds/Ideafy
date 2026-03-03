// // app/auth.ts
// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import { client } from "./sanity/lib/client";
// import { writeClient } from "./sanity/lib/write-client";
// import { AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queries";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHub({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (!profile?.id) return false;

//       const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID, {
//         id: profile.id,
//       });

//       if (!existingUser) {
//         await writeClient.create({
//           _type: "author",
//           _id: profile.id.toString(),
//           name: user?.name || user.name,
//           username: profile.login,
//           email: user.email,
//           image: user.image,
//           bio: profile?.bio || "",
//         });

//       }

//       return true;
//     },

//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         const user = await client.fetch(AUTHOR_BY_GITHUB_ID, {
//           id: profile?.id,
//         });
//         console.log(user,"hello")
//         if (user) {
//           token.id = user._id;
//         } else if (profile?.id) {
//           token.id = profile.id.toString();
//         }
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       Object.assign(session, { id: token._id });
//       console.log(session)
//       return session;
//     },
//   },
// });
// app/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    // Called whenever a user signs in
    async signIn({ user, account, profile }) {
      if (!profile?.id) return false;

      // Check if author exists in Sanity
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID, {
        id: profile.id,
      });

      // Create author if not found
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          _id: profile.id.toString(), // Sanity document ID
          name: user?.name || user.name,
          username: profile.login,
          email: user.email,
          image: user.image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },

    // JWT callback for managing token
    async jwt({ token, account }) {
      // Only set token.id if it doesn't exist
      if (!token.id) {
        let userId = token.sub; // GitHub user ID

        // Fetch author from Sanity
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID, {
          id: userId,
        });

        if (user) {
          token.id = user._id; // Sanity author ID
        } else {
          token.id = userId; // fallback to GitHub ID
        }
      }

      return token;
    },

    // Session callback to include author ID
    async session({ session, token }) {
      console.log(token.id)
      return session;
    },
  },

  // Optional: you can customize session strategy
  session: {
    strategy: "jwt",
  },
});
