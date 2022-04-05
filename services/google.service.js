const prisma = require('../db');
const OAuth2 = require('googleapis').google.auth.OAuth2;
const { google } = require('googleapis');
const googleCredentials = require('../secrets/google.json');
const jwt = require('../utils/jwt');

require('dotenv').config();

function googleConnection() {
    return new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    );
}

const service = {
    loginLink() {
        const oauth2Client = googleConnection();

        const loginLink = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: googleCredentials.web.scopes,
        });

        return loginLink;
    },
    async callback(code) {
        if (!code) throw createHttpError.Unauthorized('Invalid code');

        const oauth2Client = new googleConnection();

        return new Promise((resolve) => {
            oauth2Client.getToken(code, async (err, token) => {
                const auth = googleConnection();
                auth.setCredentials(token);

                const peopleService = google.people({ version: 'v1', auth });
                const me = await peopleService.people.get({
                    personFields: 'emailAddresses,names,photos',
                    resourceName: 'people/me',
                });

                var user;
                const username = me.data.emailAddresses[0].value;

                try {
                    user = await prisma.user.findUnique({
                        where: {
                            username,
                        },
                    });
                } catch (e) {
                    user = await prisma.user.create({
                        data: {
                            username,
                            password: 'qwerty123',
                        },
                    });
                }

                const jwtToken = await jwt.signAccessToken(user);

                resolve(jwtToken);
            });
        });
    },
    async me() {
        const oauth2Client = new googleConnection();
    },
};

module.exports = service;
