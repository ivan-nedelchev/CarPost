module.exports = {
    async get(req, res) {
        const cars = await req.car.listCars(req.query);
        res.render('home', {
            cars,
            title: 'CarPost',
            query: req.query
        });
    }
};