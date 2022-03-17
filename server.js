require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const employeeController = require('./controllers/employeeController');
const stockController = require('./controllers/stockController');
const salesController = require('./controllers/salesController');
const brancheController=require('./controllers/brancheController');



var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static('./views/images'));
app.set('views', path.join(getDir() + '/views/'));

  
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: '', layoutsDir: getDir() + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use(express.static('/views/layouts'))
app.get('/', (req, res) => {
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
res.render(getDir() + '/views/layouts/mainLayout', {layout : 'mainLayout'});

});




app.listen(4444, () => {
    console.log('Express server started at port : 4444');
});

app.use('/employee', employeeController);
app.use('/stock', stockController);
app.use('/sales',salesController);
app.use('/branches', brancheController);

function getDir() {
    if (process.pkg) {
        return path.resolve(process.execPath + "/..");
    } else {
        return path.join(require.main ? require.main.path : process.cwd());
    }
}

