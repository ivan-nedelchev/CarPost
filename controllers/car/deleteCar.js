module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const car = await req.car.getCar(carId);
            const requesterId = req.session.user.id;
            if (car.owner != requesterId) {
                res.redirect('/login');
            } else {
                if (car) {
                    res.render('deleteCar', {
                        title: `Delete Car - ${car.name}`,
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
            const carId = req.params.id;
            const requesterId = req.session.user.id;
            if (await req.car.deleteCar(carId, requesterId)) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            res.redirect('/notFound');
        }
    }
};