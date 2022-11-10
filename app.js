const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const pageNotFoundController = require('./controllers/pageNotFound');
// const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// imi permite sa exacut query-uri
// db.execute('SELECT * FROM products').then((result)=>{
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(pageNotFoundController.getPageNotFound);

app.listen(3000);
