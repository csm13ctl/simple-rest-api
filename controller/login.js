require('dotenv').config();

const express = require('express');
const router = express.Router()
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

//get all admins
router.get('/allAdmin', async (req, res) => {
    try {
        const admin = await Admin.find()
        res.json(admin);
    }catch (e) {
        res.status(500).json({ msg: err.message});
    }
})

//register
router.post('/register', async (req, res) => {
    const { name, username, pass} = req.body
    const admin = await new Admin({
        name,
        username,
        pass
    })
    try {
        const newAdmin = await admin.save();
        res.status(201).json({msg: `${newAdmin.name} is a new admin created!!!`})
    }catch (e) {
        res.status(400).json({ msg: e.message})
    }
})

//login
router.post('/', async (req, res) => {
    const { username, password} = req.body;
    try {
        let admin = await Admin.findOne({
            username:username
        })
        const TOKEN = jwt.sign({ username }, process.env.SECRET_KEY)
        res.status(200).json({ TOKEN })
    }catch (e) {
        res.status(400).json({msg: e.message});
    }
})

module.exports = router