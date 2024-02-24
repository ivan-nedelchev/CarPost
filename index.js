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
// - [X] accessory read
// - [X] accessory create
// - [X] attach accessory
// - [x] register service
// - [x] login service
// - [x] logout service
// - [x] add authorization checks to data modification

//implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] improve home page (search)
// - [x] edit
// - [x] delete
// - [X] create accessory
// - [X] attach accessory to car
// - [X] update details to include accessory
// - [x] auth controller with login, register, logout actions
// - [x] protect routes
// - [x] only show edit buttons for record owner
// - [x] add front-end code
// - [X] add database connection
// - [X] create Car model
// - [X] upgrade car service to use Car model
// - [X] add validation rules to Car model
// - [X] create Accessory model
// - [x] add session middleware and auth libraries
// - [X] create User model
// - [x] add owner property to Car, Accessory models

const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models/index');

const carsService = require('./services/cars');
const accessoryService = require('./services/accessory');
const authService = require('./services/auth');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const deleteCar = require('./controllers/delete');
const edit = require('./controllers/edit');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');
const {registerGet, registerPost, loginGet, loginPost,logout} = require('./controllers/auth')

const { notFound } = require('./controllers/notFound');
const { isLoggedIn } = require('./services/util');

start();

async function start() {
    await initDb();

    const app = express();

    app.engine('hbs', hbs.create({
        extname: ".hbs"
    }).engine);
    app.set('view engine', 'hbs');

    app.use(session({
        secret: 'my super duper secret',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: "auto"}
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carsService());
    app.use(accessoryService());
    app.use(authService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);

    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(), create.post);

    app.route('/create/accessory')
        .get(isLoggedIn(), accessory.get)
        .post(isLoggedIn(), accessory.post);

    app.route('/attach/:id')
        .get(isLoggedIn(), attach.get)
        .post(isLoggedIn(), attach.post);



    app.route('/delete/:id')
        .get(isLoggedIn(), deleteCar.get)
        .post(isLoggedIn(), deleteCar.post);

    app.route('/edit/:id')
        .get(isLoggedIn(), edit.get)
        .post(isLoggedIn(), edit.post);

    app.route('/register')
        .get(registerGet)
        .post(registerPost);

    app.route('/login')
        .get(loginGet)
        .post(loginPost);

    app.get('/logout', logout)

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
}