// Dependencies
var jimp = require('jimp');
var https = require('https');
var fs = require('fs');
var path = require('path');


// Container for all functions
var image = {};

// baseDir
image.baseDir = path.join(__dirname, './../public/card/')

// Get image
image.get = function (link, title) {
    var image_name = title;
    const file = fs.createWriteStream(image.baseDir + image_name + '.jpg');
    https.get(link, function (response) {
        // console.log(response)
        response.pipe(file)
            .on("finish", () => {
                image.resize(image_name);
            });
    }).on('error', function (err) {
        console.log(err);
    });
}

// resize image
image.resize = function (name) {
    var image_name = image.baseDir + name + '.jpg';
    jimp.read(image_name)
        .then(picture => {
            picture
                .resize(600, jimp.AUTO)
                .quality(60)
                .write(image_name)
        })
        .catch(err => {
            console.error(err);
        })
}


// Export module
module.exports = image;