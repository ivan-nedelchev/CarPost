const { mapError } = require('../../services/utils/util');
module.exports = {
    get(req, res) {
        res.render('createCar', { title: 'Create Car' });
    },
    async post(req, res) {
        try {
            const newCar = {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                price: Number(req.body.price),
                owner: req.session.user.id
            };
            await req.car.createCar(newCar);
            res.redirect('/');
        } catch (err) {
            res.locals.errors = mapError(err);
            res.render('createCar', { title: 'Create Car' });
        }
    }
};