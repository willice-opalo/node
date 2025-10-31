import { jwtVerify } from "jose";
import Users from "../models/Users";
import dotenv from 'dotenv'
import { JWT_SECRET } from "../utils/getJwtSecret";
dotenv.config()