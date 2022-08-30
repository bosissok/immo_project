const config = require('./app/config.js');
const mongoose = require('mongoose');

mongoose.connect(
    `mongodb+srv://bosissok:Olympien10@cluster0.47ie0.mongodb.net/test`, 
    {connectTimeoutMS : 3000, socketTimeoutMS: 20000, useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.once('open', () => {
   console.log(`connexion OK !`);
});