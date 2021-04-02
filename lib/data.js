/*
 * Data changes and Information
 */

// Dependencies
// ======================================================================================
var fs = require("fs");
var path = require("path");
var encrypt = require("./encrypt");

// Container for all functions
// =====================================================================================
var lib = {};

// Base Directory
// =====================================================================================
lib.baseDir = path.join(__dirname, "/../.data/");

// For Creating file
// ======================================================================================
lib.create = function (folder, filename, data, callback) {
	// first, we open folder
	fs.open(lib.baseDir + folder + "/" + filename + ".json", "wx", function (err, fileDescriptor) {
		if (!err && fileDescriptor) {
			// Stringify data to be saved
			dataStr = JSON.stringify(data);
			// Write the data into the file
			fs.writeFile(fileDescriptor, dataStr, function (err) {
				if (!err) {
					// Close the file after writing
					fs.close(fileDescriptor, function (err) {
						if (!err) {
							callback(false, dataStr);
						} else {
							callback("Could Not Close File After Writing");
						}
					});
				} else {
					callback("Could Not Write File");
				}
			});
		} else {
			callback("Could Not Create File, It May Already Exist");
		}
	});
};

// For Reading Files
// ===============================================================================
lib.read = function (folder, file, callback) {
	// Open folder and read file
	fs.readFile(lib.baseDir + folder + "/" + file + ".json", "utf-8", function (err, data) {
		if (!err && data) {
			var parsedData = encrypt.parseObject(data);
			callback(false, parsedData);
		} else {
			callback(err, data);
		}
	});
};

// Update or Edit files
// ==================================================================================
lib.update = function (folder, file, data, callback) {
	// Open folder and file for update
	fs.open(lib.baseDir + folder + "/" + file + ".json", "r+", function (err, fileDescriptor) {
		if (!err && fileDescriptor) {
			// Truncate the file
			fs.truncate(fileDescriptor, function (err) {
				if (!err) {
					// Stringify data to  be saved
					dataStr = JSON.stringify(data);
					// Update old file with new one
					fs.writeFile(fileDescriptor, dataStr, function (err) {
						if (!err) {
							// Close file
							fs.close(fileDescriptor, function (err) {
								if (!err) {
									callback(false, dataStr);
								} else {
									callback("Could Not Close File");
								}
							});
						} else {
							callback("Could not Write file");
						}
					});
				} else {
					callback("Could Not Truncate File");
				}
			});
		} else {
			callback("Could Not Open File");
		}
	});
};

// List file
// =================================================================================
lib.list = function (folder, callback) {
	fs.readdir(lib.baseDir + folder + "/", function (err, files) {
		if (!err && files && files.length > 0) {
			var trimmedfiles = [];
			files.forEach((file) => {
				trimmedfiles.push(file.replace(".json", ""));
			});
			callback(false, trimmedfiles);
		} else {
			callback(err);
		}
	});
};

// Delete file
// =================================================================================
lib.delete = function (folder, file, callback) {
	// open folder ton delete file
	fs.unlink(lib.baseDir + folder + "/" + file + ".json", function (err) {
		if (!err) {
			callback(false);
		} else {
			callback("Could Not Delete File");
		}
	});
};

// Export module
// ==================================================================================
module.exports = lib;
