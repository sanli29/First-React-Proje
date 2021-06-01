const { newData, fillData } = require('../helpers/schemaFiller');
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const getUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const users = await User.findOne({}).limit(1000);
            resolve(users);

        } catch (err) {

            reject(err);
        }
    });
}

const getUser = obj => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne(obj);
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

const getUserById = _id => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(_id).select('-password');
            resolve(user);
        } catch (err) {
            reject(err);
        }
    });
};

//new mongoose model function.
const newUser = data => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({ email: data.email });
            if (!user) {
                const { object, objectKeys } = await newData(new User());
                await fillData(object, objectKeys, data);

                const salt = await bcrypt.genSalt(10); // 10 = default
                object.password = await bcrypt.hash(data.password, salt);

                await object.save();

                resolve(object);
            } else return res.status(400).json({ err: true, msg: 'User already exists' });
        } catch (err) {
            reject(err);
        }
    });
};


//legacy mongoose model function.
const updateUser = (_id, data) => {
    return new Promise(async (resolve, reject) => {
        User.findById(_id).exec(async (err, user) => {
            if (!err) {
                const { object, objectKeys } = await newData(user);
                await fillData(object, objectKeys, data);
                try {
                    await object.save();
                    resolve(object);
                } catch (err) {
                    reject(err);
                }
            } else reject(err);
        });
    });
};

const deleteUser = _id => {
    return new Promise(async (resolve, reject) => {
        User.findOneAndRemove({ _id: id }).exec((err, user) => {
            if (!err) resolve(user);
            else reject(err);
        });
    });
};

const generateJWT = payload => {
    return new Promise(async (resolve, reject) => {
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: 300 //3600 sec = 1 hour    //360000 = longer is better for development
            },
            (err, token) => {
                if (!err) resolve(token);
                else reject(err);
            }
        );
    });
};

const authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await getUser({ email: email });

            // if there is no user with that email
            if (user) {
                // if there is a user or email (SUCCESS)
                const isMatch = await bcrypt.compare(password, user.password); //password = input | user.password = database

                if (isMatch) {
                    // if isMatch === true
                    const payload = {
                        user: {
                            id: user.id // we only need the id to access the user
                        }
                    };

                    let token = await generateJWT(payload);

                    resolve(token);
                } else reject({ msg: 'Invalid Credentials :(' });
            } else reject({ msg: 'Invalid Credentials :(' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
};


module.exports = {
    getUsers,
    getUser,
    getUserById,
    newUser,
    updateUser,
    deleteUser,
    generateJWT,
    authenticate
};
