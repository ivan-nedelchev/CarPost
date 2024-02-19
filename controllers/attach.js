module.exports = {
    async get(req, res) {
        let id = req.params.id;

        try {
            let [car, accessories] = await Promise.all([
                req.storage.getById(id),
                req.accessory.getAll()
            ]);

            const existingIds = car.accessories.map(a => a.id.toString())
            const availableAccessories = accessories.filter(a => existingIds.includes(a.id.toString()) == false)

            res.render('attach', { title: "Attach Accessory", car, accessories : availableAccessories})
        } catch (err) {
            console.log(err.message);
            res.redirect('404');
        }

    },
    async post(req, res) {
        let carId = req.params.id;
        let accessoryId = req.body.accessory;
        try {
            req.storage.attachAccessory(carId, accessoryId)
            res.redirect('/');

        } catch (err) {
            console.log('Error creating accessory');
            console.log(err.message);
            res.redirect('/attach/' + carId)
        }
    }
}