let RepoRealty = require('../repository/Realty.js');

module.exports = class Realty {
    
    // Retourner la liste des biens
    printList(request, response) {
        let Repo = new RepoRealty();
        // On récupère les éléments dans la base de données
        Repo.getList().then(list => {
        // console.log(list);
        // On les renvoie dans la vue
        response.render('admin/realty/list', {list});   
        }, (err) => {

        })
    }
    
    // Retourner la list des utilisateurs
    printList_users(request, response) {
        let Repo = new RepoRealty();
        // On récupère les éléments dans la base de données
        Repo.getList().then(list => {
        // console.log(list);
        // On les renvoie dans la vue
        response.render('admin/realty/list_users', {list});   
        }, (err) => {

        })
    }
    
    // afficher le formulaire
    printRealtyForm(req, res) {
        res.render('admin/product',{form: {address : {}, contact : {}}});   
    }

    // traiter le formulaire
    processRealtyForm(request, response) {

        let entity =  {
            address : {
                seller : request.body.realty.seller,
                address1: request.body.realty.address1,
                address2: request.body.realty.address2,
                zipcode : request.body.realty.zipcode,
                city: request.body.realty.city,
                info_address: request.body.realty.info_address,
            },
            contact : {
                civility : request.body.contact.civility,
                firstname: request.body.contact.firstname,
                lastname: request.body.contact.lastname,
                email : request.body.contact.email,
                phone: request.body.contact.phone,
                mobile: request.body.contact.mobile,
                info: request.body.contact.info
            },
            type : request.body.realty.type,
            // 1 Ancien, 2 Neuf, 3 Viager
            type_product: request.body.realty.type_product,
            price : request.body.realty.price,
            amount_commission : request.body.realty.amount_commission,
            percentage_commission: request.body.realty.percentage_commission,
            area : request.body.realty.area,
            room: request.body.realty.room,
            info_realty: request.body.realty.info_realty
        };

        let repo = new RepoRealty();
        let promise;
        if(typeof request.query.id !== 'undefined') {
            promise = repo.update(request.query.id, entity);
        } else {
            // sinon on tente de le créer
            promise = repo.add(entity);
        }
        
        promise.then((realty) => {
            request.flash('notify', 'Le formulaire a bien été validé.');
            response.redirect('/admin/realty/list');
        }, (error) => {
            response.render('realty/list', { 
                error : `L'enregistrement du formulaire à échoué`, 
                form : entity 
            }); 
        });         
    }

    // Supprimer un bien
    delete_bien(req, res) {
        let repoProduct = new RepoRealty();
        repoProduct.delete_bien(req.query.id).then((product) => {
            req.flash('notify', 'Le bien a été supprimé');
            res.redirect('/admin/realty/list');
        }, (error) => {
            req.flash('error', 'La suppression du bien a échoué');
            res.redirect('/admin/realty/list');
        });         
    };
    
    // Permet la modification d'un bien 
    edit_bien(req, res) {
        let editProduct = new RepoRealty();
        editProduct.findById(req.query.id).then((product) => {
            res.render('/admin/product',{form: product});
        }, (error) => {
            req.flash('error', 'Impossible de modifier le bien');
            res.redirect('/admin/realty/list');
        });         
    };
 }