import express from "express";
import bcrypt from "bcrypt";
import prisma from '../common/db';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) return res.sendStatus(401);
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.sendStatus(401);
    try {
        if (await bcrypt.compare(password, user.password)) {
            req.session.user_id = user.id;
            res.sendStatus(200);
        } else res.sendStatus(401);
    } catch (err) { res.sendStatus(401) }
})

router.post('/register', async (req, res) => {
    let username = req.body.username;
    let plainPassword = req.body.password;
    if (!username || !plainPassword) return res.redirect('/register');
    try {
        const password = await bcrypt.hash(plainPassword, 10)
        const { id } = await prisma.user.create({ data: { username, password } })
        res.status(201).json({ id })
    } catch (err) { res.sendStatus(409) }
})

export default router;
