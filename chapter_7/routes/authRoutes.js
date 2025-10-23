import express from 'express'
import Users from '../module/users.js'
// import Users from '../models/Users.js'
const router = express.Router()

//@route            POST app/auth/register
//@description      Register new users
//@access           Public
router.post('/register', async function (req, res, next) {
    try {
        const { name, password, email } = req.body
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
        res.send(201).json({
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

export default router;
