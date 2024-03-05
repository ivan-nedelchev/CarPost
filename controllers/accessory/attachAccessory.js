module.exports = {
    async get(req, res) {
        try {
            const carId = req.params.id;
            const [car, accessories] = await Promise.all([
                req.car.getCar(carId),
                req.accessory.listAccessories()
            ]);
            const requesterId = req.session.user.id;
            if (car.owner != requesterId) {
                res.redirect('/login');
            } else {
                const accessoriesIds = car.accessories.map(a => a.id.toString());
                const availableAccessories = accessories.filter(a => accessoriesIds.includes(a.id.toString()) === false);
                res.render('attachAccessory', {
                    title: 'Attach Accessory',
                    car,
                    accessories: availableAccessories
                });
            }
        } catch (err) {
            res.redirect('/notFound');
        }
    },
    async post(req, res) {
        const carId = req.params.id;
        try {
            const accessoryId = req.body.accessory;
            const requesterId = req.session.user.id;
            if (req.car.attachAccessory(carId, accessoryId, requesterId)) {
                res.redirect('/details/car/' + carId);
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            res.redirect('/attach/accessory/' + carId);
        }
    }
};