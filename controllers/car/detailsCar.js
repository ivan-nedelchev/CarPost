module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const car = await req.car.getCar(carId);
            const requester = req.session.user;
            if (requester && car.owner == requester.id) {
                car.isOwner = true;
            }
            if (car) {
                res.render('detailsCar', {
                    title: `CarPost - ${car.name}`,
                    car
                });
            }
        } catch (err) {
            res.redirect('/notFound');
        }
    }
};