import { SignJWT } from "jose";
import { JWT_SECRET } from "./getJwtSecret";


// import dotenv from "dotenv"

// dotenv.config()

// //convert secret into Uint8Array
// const JWT_SECRET = new TextDecoder().encode(process.env.JWT_SECRET)


export const generateTokent = async (payload, expiresIn = '15m') => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(JWT_SECRET)
}