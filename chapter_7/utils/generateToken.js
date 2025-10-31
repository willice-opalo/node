import { SignJWT } from "jose";
import { JWT_SECRET } from "./getJwtSecret.js";


// import dotenv from "dotenv"

// dotenv.config()

// //convert secret into Uint8Array
// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)


export const generateToken = async (payload, expiresIn = '15m') => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(JWT_SECRET)
}