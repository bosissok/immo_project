// const { response } = require('express');
let RepoUser = require('../repository/User');

module.exports = class list_users {
    print(req, res) {
        (new RepoUser).getList().then((users) => {
            res.render('admin/user/list_users.pug', {users});
        });
    }
    // Supprimer un utilisateur
    delete_user(req, res) {
        let repoUser = new RepoUser();
        repoUser.delete_user(req.query.id).then((user) => {
            req.flash('notify', `L'utilisateur a été supprimé`);
            res.redirect('/admin/user/list_users');
        }, (error) => {
            req.flash('error', 'La suppression du bien a échoué');
            res.redirect('/admin/user/list_users');
        });         
    };

    // Permet la modification d'un utilisateur 
    edit_user(req, res) {
        let repoUser = new RepoUser();
        repoUser.findById(req.query.id).then((user) => {
            if(req.body.length > 0) {
                let entity = {
                    email : request.body.email || '',                   
                    civility : request.body.civility || '',
                    firstname: request.body.firstname || '',
                    lastname: request.body.lastname || '',
                    phone: request.body.phone || ''
                };
                repoUser.edit_user(req.query.id, entity).then((user) => {
                    //request.flash('success','Vous etes bien inscris');
                    req.flash('notify', `L'utilisateur a été modifié`);
                    res.redirect('/admin/user/list_users');
                }, (error) => {
                    res.render('/admin/user/form', { 
                        error : `L'enregistrement en base de données a échoué`, 
                        form : entity 
                    }); 
                });     
            }
            res.render('admin/user/form',{form: user});
        }, (error) => {
            req.flash('error', `Impossible de modifier l'utilisateur`);
            res.redirect('/admin/user/list_users');
        });         
    };
}