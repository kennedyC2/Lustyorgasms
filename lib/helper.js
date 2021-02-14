/*
*
* Script for other things
*
*/

// Dependencies
// ====================================================================
var path = require('path');
var fs = require('fs');
var config = require('./config');


// Container for helpers
// ===================================================================
var helpers = {};

// Parse a JSON string object in all cases without throwing
helpers.parseJsonToObject = function (str) {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (error) {
        return error;
    }
};

// Interpolate Template
helpers.interpolateTemplate = function (templateData, data) {
    templateData = typeof(templateData) == 'string' && templateData.length > 0? templateData : false;
    data = typeof(data) == 'object' && data !== null? data : {};
    //console.log(templateData)

    // Add the template globals to the data 
    for (var keyName in config.templateGlobals) {
        if(config.templateGlobals.hasOwnProperty(keyName)) {
            data['global.' + keyName] = config.templateGlobals[keyName];
        }
    }

    // for each key in the data object, insert its value into the templateData
    for (var key in data) {
        if (data.hasOwnProperty(key) && typeof(data[key] == 'string')) {
            var replacement = data[key];
            var whatToReplace = '{'+ key +'}';
            templateData = templateData.replace(whatToReplace, replacement);
        }
    }

    return templateData;
};

// Get the string content of a template
helpers.getTemplate = function (templateName, data, callback) {
    // Sanity check
    templateName = typeof(templateName) == 'string' && templateName.length > 0? templateName : false;
    data = typeof(data) == 'object' && data !== null? data : false;
    if (templateName) {
        var templateDir = path.join(__dirname, './../templates/');
        fs.readFile(templateDir + templateName + '.html', 'utf-8', function (err, templateData) {
            if (!err && templateData) {
                // interpolate template
                var interpolatedTemplate = helpers.interpolateTemplate(templateData, data);
                callback(false, interpolatedTemplate);
            } else {
                callback('Template Not found');
                console.log('Template Not found');
            }
        });
    } else {
        callback('Invalid Template');
        console.log('invalid template name')
    }
};

// Get Full Template String
helpers.getFullTemplate = function (templateData, data, callback) {
    // Sanity Check
    templateData = typeof(templateData) == 'string' && templateData.length > 0? templateData : false;
    data = typeof(data) == 'object' && data !== null? data : {};

    // Get Header
    helpers.getTemplate('header', data, function (err, headerString) {
        if (!err && headerString) {
            // Get Footer 
            helpers.getTemplate('footer', data, function (err, footerString) {
                if (!err && footerString) {
                    // Concatenate them together
                    var FullTemplate = headerString + templateData + footerString;
                    callback(false, FullTemplate);
                } else {
                    callback('Could Not Find Footer Template');
                }
            });
        } else {
            callback('Could Not Find Header Template');
        }
    });
};

// Static Assets
helpers.getStaticAssets = function (fileName, callback) {
    fileName = typeof(fileName) == 'string' && fileName.length > 0? fileName : false;
    if (fileName) {
        var publicDir = path.join(__dirname, '/../public/');
        //console.log(publicDir)
        fs.readFile(publicDir + fileName, function (err, data) {
            //console.log(data)
            if (!err && data) {
                callback(false, data);
            } else {
                callback('Could Not Find File')
            }
        });
    } else {
        callback('Invalid File Name');
    }
};


// Export module
// ===================================================================
module.exports = helpers;