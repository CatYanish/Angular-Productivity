'use strict';

// encryption.js
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var publicAPI = {
    encryptPassword: function encryptPassword(password) {
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        return bcrypt.hashSync(password, salt);
    },
    comparePassword: function comparePassword(candidatePassword, storedPassword) {
        console.log('comparing passwords');
        console.log(candidatePassword, storedPassword);
        //ndidatePassword, this.password
        return bcrypt.compareSync(candidatePassword, storedPassword);
    }
};

module.exports = publicAPI;