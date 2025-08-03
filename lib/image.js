// Dependencies
var jimp = require('jimp');
var { get } = require('node:https');
var { createWriteStream } = require('node:fs');
var { join } = require('node:path');


// Container for all functions
var image = {};

// baseDir
image.baseDir = join(__dirname, './../public/card/')

// Get image
image.get = (link, title) => {
    var image_name = title;
    const file = createWriteStream(image.baseDir + image_name + '.jpg');
    get(link, (response) => {
        // console.log(response)
        response.pipe(file)
            .on("finish", () => {
                image.resize(image_name);
            });
    }).on('error', (err) => {
        console.log(err);
    });
}

// resize image
image.resize = async (name) => {
    var image_name = image.baseDir + name + '.jpg';
    await jimp.read(image_name)
        .then(picture => {
            picture
                .resize(600, jimp.AUTO) // resize
                .quality(60)
                .write(image_name)
        })
        .catch(err => {
            console.error(err);
        })
}


// Export module
module.exports = image;