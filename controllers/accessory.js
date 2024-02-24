module.exports = {
    get(req, res) {
        res.render('accessory', { title: 'Create Accessory' });
    },
    async post(req, res) {
        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imgUrl: req.body.imageUrl || undefined,
            price: Number(req.body.price),
            owner: req.session.user.id
        };
        try {
            await req.accessory.create(accessory);
            res.redirect('/');
        } catch (err) {
            console.log('Error creating accessory');
            console.log(err.message);
            res.redirect('/create/accessory');
        }
    }
};