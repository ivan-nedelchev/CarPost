module.exports = {
    get(req, res) {
        res.render('createAccessory', { title: 'Create Accessory' });
    },
    async post(req, res) {
        try {
            const newAccessory = {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                price: Number(req.body.price),
                owner: req.session.user.id
            };
            await req.accessory.createAccessory(newAccessory);
            res.redirect('/');
        } catch (err) {
            res.redirect('/create/accessory');
        }
    }
};