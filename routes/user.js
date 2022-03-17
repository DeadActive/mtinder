const express = require('express');
const prisma = require('../db');
const router = express.Router();

router.get('/all', async (req, res) => {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 20);

    var filter = undefined;
    try {
        filter = JSON.parse(req.query.filter);
    } catch (e) {}

    try {
        const users = await prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: filter,
            select: {
                id: true,
                username: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (users) {
            res.send(users);
            return;
        }
        res.sendStatus(404);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (user) {
            res.send(user);
            return;
        }
        res.sendStatus(404);
    } catch (e) {
        res.sendStatus(400);
    }
});

module.exports = router;
