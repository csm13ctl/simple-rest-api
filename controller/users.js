const express = require('express');
const router = express.Router()
const User = require('../models/users');

router.get('/', async(req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const sus = req.query.sus;
        let users = await User.find().skip(skip).limit(limit)
        if (sus != null) {
           users = await User.find({suspend: sus});
        }
        res.json(users);
    }catch (e) {
        res.status(500).json({ msg: err.message});
    }
})

router.delete('/deleteAll', async(req, res) => {
    try {
        await User.deleteMany();
        res.json('user cleared!!!');
    }catch (e){
        res.status(500).json({msg:e.message});
    }
})

router.post('/', async(req, res) => {
    const user = new User({
        name: req.body.name,
        suspend: req.body.suspend
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (e) {
        res.status(400).json({ msg: e.message})
    }
})


router.get('/:id', getUser, (req, res) => {
    res.send(res.user);
})

router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null){
        res.user.name = req.body.name;
    }
    if (req.body.suspend != null) {
        res.user.suspend = req.body.suspend;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    }catch (e) {
        res.status(400).json({msg: e.message});
    }  
})

router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({msg: 'user deleted!!'})
    }catch (e) {
        res.status(500).json({ msg: e.message});
    }
})


async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id);
        if (user === null) res.status(404).json({ msg: 'USER NOT FOUND'})

    } catch (e) {
        return res.status(500).json({ msg: e.message});
    }
    res.user = user;
    next();
}

module.exports = router;