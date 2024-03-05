const User = require('../../models/schemas/User');
async function register(session, username, password) {
    const user = new User({
        username,
        hashedPassword: password
    });
    await user.save();
    session.user = {
        id: user._id,
        username: user.username
    };
}
async function login(session, username, password) {
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        session.user = {
            id: user._id,
            username: user.username
        };
        return true;
    } else {
        throw new Error('Incorrect username or password');
    }
}
function logout(session) {
    delete session.user;
}
module.exports = () => (req, res, next) => {
    const user = req.session.user;
    if (user) {
        res.locals.user = user;
        res.locals.hasUser = true;
    }
    const session = req.session;
    req.auth = {
        register: (...params) => register(session, ...params),
        login: (...params) => login(session, ...params),
        logout: () => logout(session)
    };
    next();
};