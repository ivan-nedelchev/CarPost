module.exports = {
    async get(req, res) {
        let id = req.params.id;
        let car = await req.storage.getById(id);
        if (car.owner != req.session.user.id) {
            console.log('User is not owner!');
            return res.redirect('/login');
        }
        if (car) {
            res.render('delete', { title: `Delete Listing - ${car.name}`, car });
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        let id = req.params.id;
        try {
            if (await req.storage.deleteById(id, req.session.user.id)) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err);
            res.redirect('/404');
        }
    }
};