import express from 'express';
import compression from 'compression';
import path from 'path';

import configureRoute from './route';

// chunks hash được sinh ra sau khi build client code ở product
import chunkhash from '../../chunkhash.json';

let app = express();
app.use(compression({level: 5}));
app.use(express.static(path.join(__dirname, '../../public'), {
    maxAge: 7*24*3600,
    etag: false
}));

configureRoute(app);


app.use(express.static(path.join(__dirname, '../../build/temp'), {
    maxAge: 4*24*3600,
    etag: false
}));

app.use(function (req, res, next) {
    if (!/\..{20}\.js$/.test(req.path)) {
        return next();
    }

    let arr = req.path.split('/');
    let fileName = arr.pop();

    res.redirect(`/${fileName}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('*', function (req, res) {
    res.render('template', chunkhash);
});

export default app;