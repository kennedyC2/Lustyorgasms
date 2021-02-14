// Dependencies
// ==================================================================================
var fs = require('fs');
var helpers = require('./helper');
var fetch = require('./fetch');
var path = require('path');

// Container for workers
// ====================================================================================
var worker = {};

// Path to templates
worker.templateDir = path.join(__dirname, './../');

// Worker.loadPage
worker.loadPage = function (callback) {
    fetch.allCategories(function (err, straight, gay) {
        if (!err && straight && gay) {
            fetch.newVideos(false, 1, function (err, vid, num) {
                let pageLoad;
                if (!err && num) {
                    var vidpages = Math.round(num / 20);
                    pageLoad = Math.floor(Math.random() * vidpages);
                    fetch.recommendedVideos(true, pageLoad, function (err, recommended, num) {
                        if (!err && recommended && num) {
                            pageLoad = Math.floor(Math.random() * vidpages);
                            // fetch newest videos
                            fetch.newVideos(true, pageLoad, function (err, newVideos, num) {
                                if (!err && newVideos && num) {
                                    pageLoad = Math.floor(Math.random() * vidpages);
                                    // fetch top rated videos
                                    fetch.topRatedVideos(true, pageLoad, function (err, topRated, num) {
                                        if (!err && topRated && num) {
                                            pageLoad = Math.floor(Math.random() * vidpages);
                                            // fetch most viewed videos
                                            fetch.mostViewedVideos(true, pageLoad, function (err, mostViewed, num) {
                                                if (!err && mostViewed && num) {
                                                    //console.log(videoData);
                                                    // Prepare data for interpolation
                                                    var templateData = {
                                                        'head.title': 'Lust & Orgasms',
                                                        'head.description':
                                                            'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
                                                        'body.class': 'index',
                                                        'body.title': 'Lusty Orgasms | Porn Videos',
                                                        'body.title1': 'Lusty Orgasms | Porn Videos',
                                                        'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
                                                        'body.url1': 'https://lustyorgasms.com',
                                                        'body.url2': 'https://lustyorgasms.com',
                                                        'body.url3': 'https://lustyorgasms.com',
                                                        'body.straight': straight,
                                                        'body.gay': gay,
                                                        'ipBody.straight': straight,
                                                        'ipBody.gay': gay,
                                                        'dpBody.straight': straight,
                                                        'dpBody.gay': gay,
                                                        'body.new': newVideos,
                                                        'body.topRated': topRated,
                                                        'body.mostWatched': mostViewed,
                                                        'body.recommended': recommended
                                                    };

                                                    // Get index template
                                                    helpers.getTemplate('index', templateData, function (
                                                        err,
                                                        templateString
                                                    ) {
                                                        if (!err && templateString) {
                                                            //console.log(templateData);
                                                            helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
                                                                if (!err && fullString) {
                                                                    fs.open(worker.templateDir + 'templates' + '/' + 'indexTemplate' + '.html', 'r+', function (err, fileDescriptor) {
                                                                        if (!err && fileDescriptor) {
                                                                            // Truncate the file
                                                                            fs.ftruncate(fileDescriptor, function (err) {
                                                                                if (!err) {
                                                                                    // Update old file with new one
                                                                                    fs.writeFile(fileDescriptor, fullString, function (err) {
                                                                                        if (!err) {
                                                                                            // Close file
                                                                                            fs.close(fileDescriptor, function (err) {
                                                                                                if (!err) {
                                                                                                    callback(false, fullString);
                                                                                                } else {
                                                                                                    callback('Could Not Close File');
                                                                                                }
                                                                                            });
                                                                                        } else {
                                                                                            callback('Could not Write file');
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    callback('Could Not Truncate File');
                                                                                }
                                                                            });
                                                                        } else {
                                                                            callback('Could Not Open File');
                                                                        }
                                                                    });
                                                                } else {
                                                                    callback('Error Getting Full String');
                                                                }
                                                            });
                                                        } else {
                                                            callback('Error With Template String');
                                                        }
                                                    });
                                                } else {
                                                    callback('Error Fetching Most Viewed Videos');
                                                }
                                            });
                                        } else {
                                            callback('Error Fetching Top Rated Videos');
                                        }
                                    });
                                } else {
                                    callback('Error Fetching New Videos');
                                }
                            });
                        } else {
                            callback('Error Fetching Recommended Videos');
                        }
                    });
                } else {
                    callback('Error Fetching Page Number');
                }
            });
        } else {
            callback('Error Fetching Categories');
        }
    });
};


// Export Modules
module.exports = worker;