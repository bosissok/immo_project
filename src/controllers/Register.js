let RepoUser = require('../repository/User.js');

module.exports = class Register {
    printForm(request, response) {
        response.render('register/form', {form: {}});  
    }

    processForm(request, response) {
        let entity = {
            email : request.body.email || '',
            password : console.log(request.body.password) || '', // devra être hashé
            civility : request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || ''
        };

        let repo = new RepoUser();
        repo.emailExists(entity.email).then((result) => {
            // Dans le cas où l'email existe deja dans la bdd
            if(result === true) {
                response.render('register/form', { 
                    error : `Cette adresse email existe déjà dans notre base de données`, 
                    form : entity 
                }); 
            } else {
                //  Hashage du mot de passe
                let bcrypt = require('bcryptjs');
                entity.password = bcrypt.hashSync(
                    entity.password, 
                    bcrypt.genSaltSync(10)
                );
        
                // sinon on tente de le créer
                repo.add(entity).then((user) => {
                    //request.flash('success','Vous etes bien inscris');
                    request.flash('notify', 'Votre compte a bien été créé.');
                    response.redirect('/');
                }, (error) => {
                    response.render('register/form', { 
                        error : `L'enregistrement en base de données a échoué`, 
                        form : entity 
                    }); 
                });         
            }
        });
    }
};