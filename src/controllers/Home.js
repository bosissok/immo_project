let RepoRealty = require('../repository/Realty.js');

module.exports = class Home {
    print(request, response) {
        let Repo = new RepoRealty();
        // On récupère les éléments dans la base de données
        Repo.getList().then(list => {
            // On les renvoie dans la vue
            response.render('home', {list});   
        }, (err) => {

        });
    }
};