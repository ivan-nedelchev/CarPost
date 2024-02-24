module.exports = {
    async home(req, res) {
        const cars = await req.storage.getAll(req.query);
        res.render('index', {
            cars,
            title: 'CarPost',
            query: req.query,
            errors: [{ msg: 'text error' }]
        });
    }
};