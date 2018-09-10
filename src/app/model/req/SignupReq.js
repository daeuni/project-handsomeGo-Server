const hash = require('../../module/hash.js');

module.exports = {
    new : function(body) {
        let newUser = {
            email: body.email,
            name : body.name,
            password: hash.encoding(body.password)
        };
        return newUser;
    }
}