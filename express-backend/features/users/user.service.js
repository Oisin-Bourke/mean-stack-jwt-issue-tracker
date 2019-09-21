/**
 * Core business logic with authenticate and CRUD methods.
 */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db.js');
const dotenv = require('dotenv');
const User = db.User;

dotenv.config();

//service method definitions:
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    //if password matches user's hashed password
    if (user && bcrypt.compareSync(password, user.hash)) {
        //user to Object less hashed password
        const { hash, ...userWithoutHash } = user.toObject();
        //get token with user... jwt.sign(payload,secret key)
        const token = jwt.sign({ sub: user.id }, process.env.SECRET /*add time-frame or sign options param here*/);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    //less -hash field
    return await User.find().select('-hash');
}

async function getById(id) {
    //less -hash field
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    /*
    if (await User.findOne({ email: userParam.email })){
        throw 'Email "' + userParam.email + '" is already in use';
    }
    */

    const user = new User(userParam);

    // hashing password with bcrypt
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
