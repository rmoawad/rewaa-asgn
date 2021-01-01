const config = require('../../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/db');

async function authenticate({ username, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
        throw 'Username or Password is incorrect';
    }

    // authentication successful
    const token = jwt.sign(
        {
            sub: user.id
        },
        config.secret,
        {
            expiresIn: '1d'
        }
      );
    return { ...omitHash(user.get()), token };
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hashedPassword = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);
}

function omitHash(user) {
    const { hashedPassword, ...userWithoutHash } = user;
    return userWithoutHash;
}

module.exports = {
    authenticate,
    create,
};
