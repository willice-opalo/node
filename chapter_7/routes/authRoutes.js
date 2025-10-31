import express from 'express'
// import Users from '../models/users.js'
import { jwtVerify } from 'jose'
import { JWT_SECRET } from '../utils/getJwtSecret.js'
import { generateToken } from '../utils/generateToken.js'
import Users from '../models/Users.js'
const router = express.Router()

//@route            POST app/auth/register
//@description      Register new users
//@access           Public
router.post('/register', async function (req, res, next) {
    try {
        const { name, password, email } = req.body || {}

        if (!name || !password || !email) {
            res.send(400)
            throw new Error("All fields are required");
        }

        const existingUser = await Users.findOne({ email })

        if (existingUser) {
            res.send(401)
            throw new Error("User already exists");
        }
        
        const user = await Users.create({ name, password, email })

        //create Tokens
        const payload = { userId: user._id.toString() }
        const accessToken = generateToken(payload, '1m')
        const refreshToken = generateToken(payload, '30d')

        //setting the jwt to http-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
        })

        res.send(201).json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (err) {
        console.log(err)
       next(err)
    }
})

//@route            POST app/auth/login
//@description      authenticate user
//@access           Private
router.post('/login', async (res, req, next) => {
    try {
        const { email, password } = req.body || {}

        if (!email || !password) {
            res.status(404)
            throw new Error('User Not Found')
        }

        //find the user
        const user = await findOne({ email })

        if (!user) {
            res.status(404)
            throw new Error('Invalid Credentials')
        }

        //Check is password hashed matches 
        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            res.status(404)
            throw new Error('Invalid Credentials')
        }

        //create Tokens
        const payload = { userId: user._id.toString() }
        const accessToken = generateToken(payload, '1m')
        const refreshToken = generateToken(payload, '30d')

        //setting the http-only cookie
        res.cookies('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
        })

        res.send(201).json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

//@route            POST app/auth/logout
//@description      Logout User
//@access           Private

router.post('/logout', (res, req, next) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
    })

    res.status(200).json({
        message: 'Logged out Successfully'
    })
})

//@route            POST app/auth/register
//@description      Generate new access token from refresh token
//@access           Public and it needs valid refresh cookie
router.post('./refresh', async (res, req, next) => {
    try {
        const token = req.cookie?.refreshToken
        console.log('Refreshing Token...')

        if (!token) {
            res.status(401)
            throw new Error('No refresh token')
        }

        const { payload } = await jwtVerify(token, JWT_SECRET)
        
        const user = await Users.findById(payload.userId)

        if (!user) {
            res.status(401)
            throw new Error('No user')
        }

        const newAccessToken = await generateToken({ userId: user._id.toString() }, '1m')
        
        res.json({
            accessToken: newAccessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        res.status(401)
        next(err)
    }
})
export default router;
