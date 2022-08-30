require('../../app/database.js');
const mongoose = require('mongoose');
// Ajout du plugin slug
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const RealtySchema = mongoose.Schema({
    slug : {  type : String ,  slug :["address.seller","address.zipcode", "address.city"], unique: true},  
    address : {
        seller : {type: String },
        address1: { type: String},
        address2: { type: String},
        zipcode : { type: String },
        city: { type: String},
        info_address: { type: String },
    },
    contact : {
        civility : {type: String, match: /[1-2]{1}/},
        firstname: { type: String, match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ },
        lastname: { type: String, match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁ ÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/ },
        email : { type: String },
        phone: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
        mobile: { type: String, match: /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/ },
        info: { type: String },
        slug : {  type : String ,  slug :["", ""]},
        slug : {  type : String ,  slug :["", ""]},
        slug : {  type : String ,  slug :["", ""]},
    },
    type : {type: String, match: /[1-6]{1}/},
    // 1 Ancien, 2 Neuf, 3 Viager
    type_product: {type: String, match: /[1-3]{1}/},
    price : {type: Number},
    amount_commission : {type: Number},
    percentage_commission: { type: Number },
    area : {type: Number},
    room: { type: Number },
    info_realty: { type: String }
},  {
    versionKey: false // You should be aware of the outcome after set to false
},

);



module.exports = class Realty {
    constructor() {
        this.db = mongoose.model('Realty', RealtySchema); 
    }

    add(realtyEntity) {
        return new Promise((resolve, reject) => {
            this.db.create(realtyEntity, function (err, realty) {
                if (err) reject(err);
                resolve(realty);
            });
        });
    }
    // fonction pour mise à jour d'un bien 
    update(id, realtyEntity) {
        return new Promise((resolve, reject) => {
            this.db.updateOne({_id : id}, realtyEntity, function (err) {
                if (err) reject(err);
                resolve();
            });
        });
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

    findById(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({_id : id}, function(err, realty) {
                if (err || realty === null) reject(err);
                resolve(realty);
            });
        });
    }
    
    // Suppression d'un utilisateur
    delete_bien(id) {
        return new Promise((resolve, reject) => {
            this.db.deleteOne({_id: id}, (err, product) => {
                if( !err ) {
                    resolve(product)
                }
                resolve(false);
            });
        });
    }
}