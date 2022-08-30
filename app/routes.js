const csrf = require('../src/services/LcCsrfToken');


module.exports = (app) => {

    app.use('/', (req, res, next) =>  {
        const Cookies = require("cookies");
        const config = require('./config.js');
        const jwt = require('jsonwebtoken');
        // Récupération du token dans le cookie
        let token = new Cookies(req,res).get('access_token');
   
        // Si le cookie (access_token) existe
        if (typeof token !== 'undefined' && token !== null) {
            // sinon on vérifie le jwt
            jwt.verify(token, config.appKey, (err, dataJwt) => { 
                console.log(err)
                // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
                if(err) return resp.sendStatus(403);
                res.locals.user = dataJwt;
                res.locals.connected = true;
                next();
            });
        } else {
            next();
        }
    });
        
    app.use('/admin', (req, res, next) => {
        // A partir de là le JWT est valide on a plus qu'à vérifier les droits
        // Si on est admin
        if(typeof res.locals.user != 'undefined' && typeof res.locals.user.roles != 'undefined' && res.locals.user.roles[0] == 'admin') {
            next();
        } 
        else {
            // si on n'est pas admin
            return res.sendStatus(401);
        }
    })

    // Route home page 
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });

    app.get('/annonce/:id', (req, res) => {
        let Announce = require('../src/controllers/Announce.js');
        (new Announce()).print(req, res);
    });
    
    // Route page REGISTER
    app.get('/inscription', csrf.generate, (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).printForm(req, res);
    });
    app.post('/inscription', csrf.check, (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).processForm(req, res);
    });

    // Route vers la page AUTHENTICATED 
    app.get('/connexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).print(req, res);
    });
    app.post('/connexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).processForm(req, res);
    });

    app.get('/deconnexion', (req, res) => {
        req.session.user = null;
        res.redirect('/');
    });

    // Route vers la page Layout (Admin)
    app.get('/admin', (req, res) => {
        let Layout = require('../src/controllers/Layout.js');
        (new Layout()).print(req, res);
    });

    // Route vers la page de création de product 
    app.get('/admin/product', csrf.generate,(req, res) => {
        let product = require('../src/controllers/Realty.js');
        (new product()).printRealtyForm(req, res);
    });

    app.post('/admin/product', csrf.check, (req, res) => {
        let product = require('../src/controllers/Realty.js');
        (new product()).processRealtyForm(req, res);
    });

     //---------------------------------------------------------
    //  ADMIN Realty
    //---------------------------------------------------------

    // Création de la route pour lister les biens 
    app.get('/admin/realty/list', (req, res) => {
        let realty = require('../src/controllers/Realty');
        (new realty()).printList(req, res);
    });
    // Suppression liste des biens
    app.get('/admin/realty/delete', (req, res) => {
        // console.log(req.query.id);
        let realty = require('../src/controllers/Realty');
        (new realty()).delete_bien(req, res);
    });

    // Modification liste des biens ( Get permet seulement l'affichage et non le traitement)
    app.get('/admin/realty/edit', (req, res) => {
        // console.log(req.query.id);
        let realty = require('../src/controllers/Realty');
        (new realty()).edit_bien(req, res); 
    });

    // Soumission organisation des biens
    app.post('/admin/realty/edit', (req, res) => {
        // console.log(req.query.id);
        let product = require('../src/controllers/Realty.js');
        (new product()).processRealtyForm(req, res);
    });

    //---------------------------------------------------------
    //  ADMIN User
    //---------------------------------------------------------
    
    // Création de la route pour lister les utilisateurs 
    app.get('/admin/user/list_users', (req, res) => {
        let users = require('../src/controllers/list_users');
        (new users()).print(req, res);
    });

    // Suppression liste des utilisateurs
    app.get('/admin/user/delete', (req, res) => {
        // console.log(req.query.id);
        let user = require('../src/controllers/list_users');
        (new user()).delete_user(req, res);
    });

    // Modification liste des utilisateur ( Get permet seulement l'affichage et non le traitement)
    app.get('/admin/user/edit', csrf.generate, (req, res) => {
        // console.log(req.query.id);
        let user = require('../src/controllers/list_users');
        (new user()).edit_user(req, res); 
    });

     app.post('/admin/user/edit', csrf.check, (req, res) => {
         // console.log(req.query.id);
         let user = require('../src/controllers/list_users');
         (new user()).edit_user(req, res);
     });
};