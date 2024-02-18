module.exports = {
    async details(req, res) {
        const id = req.params.id;
        const car = await req.storage.getById(id);
        const accessories = await req.accessory.getAll()

        if(car) {
            res.render('details', {title: `CarPost - ${car.name}`, car, accessories})
        } else {
            res.redirect('/404')
        }
    }
};