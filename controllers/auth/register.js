const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { mapError } = require('../../services/utils/util');
const router = Router();
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});
router.post('/register',
    body('username').trim(),
    body('password').trim(),
    body('repeatPassword').trim(),
    body('username')
        .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
        .isAlphanumeric().withMessage('Username must use alphanumeric characters only'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isAlphanumeric().withMessage('Password must use alphanumeric characters only'),
    body('repeatPassword')
        .custom((value, { req }) => value === req.body.password).withMessage('Passwords don\'t match'),
    async (req, res) => {
        const username = req.body.username;
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }
            const password = req.body.password;
            await req.auth.register(username, password);
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('register', {
                title: 'Register',
                data: { username }
            });
        }
    }
);
module.exports = router;