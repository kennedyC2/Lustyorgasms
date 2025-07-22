/*
* Encryption
*/

// Dependencies
// ===========================================================================
var config = require('./config');
var { createHash } = require('node:crypto');

// Container for hash
// ==========================================================================
var encrypt = {};

// Parse JSON to object
encrypt.parseObject = (data) => {
    try {
        var obj = JSON.parse(data);
        return obj;
    } catch (e) {
        return e;
    }
};

// Hash password
encrypt.password = (input) => {
    if (typeof (input) == 'string' && input.length > 5) {
        newPassword = createHash('sha256', config.littleSecret).update(input).digest('hex');
        return newPassword;
    } else {
        return false;
    }
};

// Generate Random Strings
encrypt.createRandomString = (strLen) => {
    strLen = typeof (strLen) == 'number' && strLen >= 10 ? strLen : false;
    if (strLen) {
        // Define possible characters
        var possibleCharacters = 'abcdefghijklmnopqrstuvwsyz1234567890';
        // Generation process
        var finale = '';
        for (i = 1; i < strLen; i += 1) {
            // Get a random character from possibleCharacters
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            // join this item to string
            finale += randomCharacter;
        }
        return finale;
    } else {
        return false;
    }
};

// Export module
// =============================================================================================
module.exports = encrypt;