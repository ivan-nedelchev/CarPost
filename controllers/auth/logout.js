const { Router } = require('express');
const router = Router();
router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});
module.exports = router;