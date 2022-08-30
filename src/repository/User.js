require('../../app/database.js');
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email : {  type: String },
    password : { type: String },
    civility : {type: String, match: /[1-2]{1}/},
    firstname: { type: String, match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ },
    lastname: { type: String, match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ },
    phone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
    date: { type: Date, default: Date.now },
    roles: { type: Array }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
module.exports = class User {
    constructor() {
        this.db = mongoose.model('User', UserSchema); 
    }

    add(userEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(userEntity, function (err, user) {
                if (err) reject(err);
                resolve(user);
            });
        });
    }
    async emailExists(email) {
        return await this.db.findOne({email}) ? true : false;
    }

        
    getList() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, list) => {
                if( !err ) {
                    resolve(list)
                }
                resolve(false);
            });
        });
    }

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.findOne({email}, (err, user) => {
                if( err || user === null) {
                    reject('Email incorrect')
                }
                resolve(user);
            });
        });
    }
    // Fonction suppression utilisateur
    delete_user(id) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne({_id: id}, (err, user) => {
                if( !err ) {
                    resolve(user)
                }
                resolve(false);
            });
        });
    }
    
    //
    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({_id : id}, function(err, user) {
                if (err || user === null) reject(err);
                resolve(user);
            });
        });
    }
    edit_user(id, user) {
        return new Promise((resolve, reject) => {
            this.db.updateOne({_id : id}, user, function (err) {
                if (err) reject(err);
                resolve();
            });
        });
    }
}
