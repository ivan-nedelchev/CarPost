module.exports = {
    async get(req, res) {
        let id = req.params.id;
        let car = await req.storage.getById(id);

        if(car.owner != req.session.user.id) {
            console.log('User is not owner!');
            return res.redirect('/login')
        }

        if(car) {
            res.render('edit', {title : `Edit Listing - ${car.name}`, car});
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        let id = req.params.id;
        const car = {
            name : req.body.name,
            description : req.body.description,
            imgUrl : req.body.imageUrl,
            price : Number(req.body.price)
        };

      

        try {
            if(await req.storage.updateById(id, car, req.session.user.id)) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            res.redirect('/404');
        }

    }
}