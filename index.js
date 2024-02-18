// [x] initialize and configure Express app
// [x] initialize templating library
// [x] create home controller
// [x] bind routing
// [X] create layout
//create data service
// - [x] read all
// - [x] read one by ID 
// - [x] create
// - [x] edit
// - [x] delete 
// - [x] search
// - [] accessory read
// - [] accessory create
// - [] attach accessory
//implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] improve home page (search)
// - [x] edit
// - [x] delete
// - [] create accessory
// - [] attach accessory to car
// - [] update details to include accessory
// - [x] add front-end code
// - [X] add database connection
// - [X] create Car model
// - [X] upgrade car service to use Car model
// - [] add validation rules to Car model
// - [] create Accessory model

const express = require('express');
const hbs = require('express-handlebars');

const initDb = require('./models/index');

const carsService = require('./services/cars')

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const deleteCar = require('./controllers/delete')
const edit = require('./controllers/edit')

const { notFound } = require('./controllers/notFound');

start();

async function start() {
    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: ".hbs"
    }).engine);
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carsService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(create.get)
        .post(create.post);

    app.route('/delete/:id')
        .get(deleteCar.get)
        .post(deleteCar.post);

    app.route('/edit/:id')
        .get(edit.get)
        .post(edit.post);

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
}