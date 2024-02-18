module.exports = {
    async get(req, res) {
        let id = req.params.id;
        let car = await req.storage.getById(id);
        if(car) {
            res.render('delete', {title : `Delete Listing - ${car.name}`, car});
        } else {
            res.redirect('404');
        }
    },
    async post(req, res) {
        let id = req.params.id;
        try {
            await req.storage.deleteById(id)
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.redirect('/404');
        }
    }
}