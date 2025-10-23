import express from 'express'
import User from '../module/User.js'
import Users from '../models/Users.js'
const router = express.Router()

//@route            POST app/auth/register
//@description      Register new users
//@access           Public
router.post('/register', async function (req, res, next) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400)
            throw new Error("All fields are required");
        }
        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            res.send(400)
            throw new Error("User already exists");
        }
        const user = await Users.create({ name, email, password })
        res.status(201).json({
            user: {
                id: user._id,
                name: user.name,
                password: user.password,
            }
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

export default router;
