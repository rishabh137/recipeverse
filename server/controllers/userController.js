import User from '../models/User.js'
import { generateToken } from '../lib/utils/generateToken.js';
import bcrypt from "bcryptjs"

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email" })
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hashPassword,
        });

        await newUser.save()

        generateToken(newUser._id, res)

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
};

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid username" })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        })
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
}

export { registerUser, authUser, getUserById, logout, getCurrentUser };
