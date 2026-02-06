const User = require('../model/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const userController = {}

userController.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hash });
        await newUser.save();

        res.status(200).json({ status: 'ok', data: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
}

userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = user.generateToken();
        return res.status(200).json({ status: 'ok', data: user, token });
    } catch (error) {
        return res.status(500).json({ status: 'fail', message: error.message });
    }
}

module.exports = userController
