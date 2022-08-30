let RepoUser = require('../repository/User.js');
const config = require('../../app/config.js');
let jwt = require('jsonwebtoken');
let Cookies = require("cookies");


module.exports = class Authenticated {
    print(request, response) {
        response.render('register/authenticated',{form: {}});   
    }
    processForm(request, response) {
        let entity = {
            email : request.body.email || '',
            password : console.log(request.body.password) || '', // devra être hashé
        };

        let repo = new RepoUser();
        repo.getUserByEmail(entity.email).then((user) => {      
          
            //  Hashage du mot de passe
            let bcrypt = require('bcryptjs');
            if(bcrypt.compareSync( entity.password, user.password)) {
                let accessToken = jwt.sign({
                    username: user.email, 
                    firstname: user.firstname, 
                    lastname: user.lastname,
                    roles: user.roles
                }, config.appKey, {expiresIn: 604800});       
                new Cookies(request,response).set('access_token', accessToken, {httpOnly: true, secure: false });

                request.flash('notify', 'Vous êtes bien connecté');
                response.redirect('/');
            } else {
                request.flash('error', `L'identification a échouée`);
                response.redirect('/connexion');
            }  
        }, (error) => {
            request.flash('error', `L'identification a échouée`);
            response.redirect('/connexion');
        });
    }
};