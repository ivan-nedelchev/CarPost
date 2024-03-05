const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const attachAccessoryController = require('./controllers/accessory/attachAccessory');
const createAccessoryController = require('./controllers/accessory/createAccessory');
const loginController = require('./controllers/auth/login');
const logoutController = require('./controllers/auth/logout');
const registerController = require('./controllers/auth/register');
const createCarController = require('./controllers/car/createCar');
const deleteCarController = require('./controllers/car/deleteCar');
const detailsCarController = require('./controllers/car/detailsCar');
const editCarController = require('./controllers/car/editCar');
const homeController = require('./controllers/main/home');
const notFoundController = require('./controllers/main/notFound');
const initDatabase = require('./models/index');
const accessoryService = require('./services/main/accessory');
const authService = require('./services/main/auth');
const carService = require('./services/main/car');
const { isLoggedIn } = require('./services/utils/util');
start();
async function start() {
    await initDatabase();
    const app = express();
    app.engine('hbs', hbs
        .create({ extname: '.hbs' })
        .engine);
    app.set('view engine', 'hbs');
    app.use(session({
        secret: 'my super duper secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto' }
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(accessoryService());
    app.use(authService());
    app.use(carService());
    app.use('/static', express.static('static'));
    app.route('/attach/accessory/:id')
        .get(isLoggedIn(), attachAccessoryController.get)
        .post(isLoggedIn(), attachAccessoryController.post);
    app.route('/create/accessory')
        .get(isLoggedIn(), createAccessoryController.get)
        .post(isLoggedIn(), createAccessoryController.post);
    app.route('/create/car')
        .get(isLoggedIn(), createCarController.get)
        .post(isLoggedIn(), createCarController.post);
    app.route('/delete/car/:id')
        .get(isLoggedIn(), deleteCarController.get)
        .post(isLoggedIn(), deleteCarController.post);
    app.get('/details/car/:id', detailsCarController.get);
    app.route('/edit/car/:id')
        .get(isLoggedIn(), editCarController.get)
        .post(isLoggedIn(), editCarController.post);
    app.get('/', homeController.get);
    app.use(loginController);
    app.use(logoutController);
    app.use(registerController);
    app.all('*', notFoundController.get);
    app.listen(3000, () => console.log('Server started on port 3000'));
}