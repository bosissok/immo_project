//  module.exports = class Token {
//      print(req, res) {
//          let token = new Cookies(req,res).get('access_token');
//          if (token == null) return res.sendStatus(401)
//          jwt.verify(token, accessToken, (err, user) => { 
//              // Erreur du JWT
//              if(err) return res.sendStatus(403);
//              // Est admin
//              if(typeof user.roles != 'undefined' && user.roles == 'admin') {
//                  return res.send(`Admin ${user.firstname}`);
//              }
//              // n'est pas admin
//              return res.send(`${user.firstname} PAS ADMIN !!!!  est ${user.roles}`)
//          });
//      }
//  };

