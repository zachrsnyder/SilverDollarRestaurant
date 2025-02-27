import "server-only";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);


export async function deleteSession() {
  const cookie = await cookies()
  cookie.delete("authToken");
}

// type SessionPayload = {
//     userId: string;
//     role: string;
//     fName: string
//     expiresAt: number;
//   };
// export const getSessionUser = cache(async (): Promise<JWTPayload | undefined> => {
//     const cookie = await cookies()
//     const value = cookie.get("session")?.value;
//     // console.log(value);

//     const session = await decrypt(value);
//     return session;
// })


// export async function encrypt(payload: SessionPayload) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(encodedKey);
// }

// export async function decrypt(session: string | undefined = "") {
//   try {
//     // console.log("Session being verified:", session);
//     // console.log("encoded key", encodedKey);
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     console.log(payload)
//     return payload;
//   } catch (error) {
//     console.log("Failed to verify session");
//     console.log(error)
//   }
// }