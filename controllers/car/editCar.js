module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const car = await req.car.getCar(carId);
            const requesterId = req.session.user.id;
            if (car.owner != requesterId) {
                res.redirect('/login');
            }
            else {
                if (car) {
                    res.render('editCar', {
                        title: `Edit Car - ${car.name}`,
                        car
                    });
                }
            }
        } catch (err) {
            res.redirect('/notFound');
        }
    },
    async post(req, res) {
        try {
            const editedCar = {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                price: Number(req.body.price)
            };
            const carId = req.params.id;
            const requesterId = req.session.user.id;
            if (await req.car.editCar(editedCar, carId, requesterId)) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            res.redirect('/notFound');
        }
    }
};