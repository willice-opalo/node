import { jwtVerify } from "jose";
import Users from "../models/Users";
import dotenv from 'dotenv'
import { JWT_SECRET } from "../utils/getJwtSecret.js";
dotenv.config()

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401)
            throw new Error('Not authorized, no token')
        }

        const token = authHeader.split(' ')[1]

        const { payload } = await jwtVerify(token, JWT_SECRET)
        
        const user = await Users.findById(payload.userId).select('_id name email')

        req.user = user
        next()
    } catch (err) {
        console.error(err)
        res.status(401)
        next(new Error('Not authorised, token failed'))
    }
}