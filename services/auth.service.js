const prisma = require('../db');

require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createHttpError = require('http-errors');

const service = {
    async register(data) {
        const { username } = data;
        data.password = bcrypt.hashSync(data.password, 8);

        const user = await prisma.user.create({
            data,
        });

        data.accessToken = await jwt.signAccessToken(user);

        return data;
    },
    async login(data) {
        const { username, password } = data;

        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            throw createHttpError.NotFound('User not registered');
        }

        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword)
            throw createHttpError.Unauthorized('Invalid credentials');

        delete user.password;
        const accessToken = await jwt.signAccessToken(user);
        return { ...user, accessToken };
    },
    async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    },
    async update(token, data) {
        try {
            const { payload } = jwt.decodeAccessToken(token);

            data.password = bcrypt.hashSync(data.password, 8);

            const user = await prisma.user.update({
                where: {
                    id: payload.id,
                },
                data: {
                    username: data.username,
                    password: data.password,
                },
            });

            delete user.password;

            return user;
        } catch (e) {
            if ((e.code = 'P2002')) {
                throw createHttpError.Conflict('Username conflict');
            }
            throw createHttpError.InternalServerError('Error');
        }
    },
    async me(token) {
        try {
            const { payload } = jwt.decodeAccessToken(token);

            const user = await prisma.user.findUnique({
                where: {
                    id: payload.id,
                },
                select: {
                    createdAt: true,
                    updatedAt: true,
                    username: true,
                    id: true,
                },
            });

            return user;
        } catch (e) {
            throw createHttpError.NotFound('User does not exist');
        }
    },
};

module.exports = service;
