const crypto = require('crypto');

exports.generate = (req, res, next) => {
    let token = crypto.createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
    //-- Ajouter le token dans la session et rendre accessible le token dans la vue
    req.session.token_csrf = token;
    res.locals.token_csrf = token;
    // console.log(res.locals.token_csrf);
    next();
};

exports.check = (req, res, next) => {
 console.log(req.session.token_csrf);
 console.log(req.body.csrf);
    if (req.session.token_csrf == req.body.csrf) {
        res.locals.token_csrf = req.body.csrf; 
        next();
    } else {
            return res.status(403).send(`CSRF détecté`);
     }
};