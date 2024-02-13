const users = require('../Models/userModel')
const jwt = require('jsonwebtoken');

//register
exports.register = async (req, res) => {
    console.log("inside register API");
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        const existingUser = await users.findOne({ email })
        console.log(existingUser)
        if (existingUser) {
            res.status(406).json("Email already registered.Please Login.")
        }
        else {
            const newUser = new users({
                username, email, password, profilepic: "", github: "", linkedin: ""
            })
            await newUser.save()
            console.log(newUser);
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//login
exports.login = async (req, res) => {
    console.log("inside login API");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email, password })
        console.log(existingUser)
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY)
            res.status(200).json({ existingUser, token })
        }
        else {
            res.status(404).json("Invalid email / password!")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//edit profile
exports.editUser = async (req, res) => {
    console.log("inside edit profile API");
    const  userId  = req.payload
    const { username, email, password, github, linkedin, profileImage } = req.body
    const profilepic = req.file ? req.file.filename : profileImage
    // console.log( email, password);
    try {
        const updateUser = await users.findByIdAndUpdate({ _id: userId }, 
            { username, email, password, profilepic, github, linkedin }, { new: true })
        console.log(updateUser)
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
