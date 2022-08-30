const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
const sassMiddleware = require('node-sass-middleware');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
const session = require('express-session');
app.use(session({
    secret: config.appKey, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));
//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
const flash = require('express-flash-messages');
app.use(flash());

//--------------------------------------------------------------------
//      Gestinnaire sass
//--------------------------------------------------------------------
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'build'),
    dest: path.join(__dirname, 'public'),
    debug: false,
    indentedSyntax: false, // true Compiles files with the .sass extension
    outputStyle: 'compressed'
}));

//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
 
//--------------------------------------------------------------------
//       permet d'envoyer des variables à toutes les vues
//-------------------------------------------------------------------- 
app.use((req,res,next) => {
    req.session.user = {
        _id: '6079666130334e68d8f15ebc',
        email: 'adresse@gmail.com',
        password: '$2a$10$FS4M4WJzNZdzYoVBuEzQPOx1W3R1RLp0gz7H74IAKrl1KAfuQ5uY2',
        civility: '1',
        firstname: 'Boubacar',
        lastname: 'Sissoko',
        phone: '0628636981',
        date: '2021-04-16T10:26:41.149Z'
    }
    next();
 });

app.use((req,res,next) => {
    // res.locals.session = req.session;
    res.locals.websiteName = config.websiteName;
    res.locals.user = {};
    res.locals.route = req._parsedUrl.pathname; 
    next();
});


//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
require('./app/routes')(app);
 
//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(config.port,() => {
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
    if (process.send) {
        process.send('online');
    }
});