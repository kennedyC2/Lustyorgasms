/*
 * Data changes and Information
 */

// Dependencies
// ======================================================================================
var { open, writeFile, close, readFile, truncate, readdir, unlink } = require("node:fs");
var { join } = require("node:path");
var { parseObject } = require("./encrypt");

// Container for all functions
// =====================================================================================
var lib = {};

// Base Directory
// =====================================================================================
lib.baseDir = join(__dirname, "/../.data/");

// For Creating file
// ======================================================================================
lib.create = (folder, filename, data, callback) => {
	// first, we open folder
	open(lib.baseDir + folder + "/" + filename + ".json", "wx", (err, fileDescriptor) => {
		if (!err && fileDescriptor) {
			// Stringify data to be saved
			dataStr = JSON.stringify(data);
			// Write the data into the file
			writeFile(fileDescriptor, dataStr, (err) => {
				if (!err) {
					// Close the file after writing
					close(fileDescriptor, (err) => {
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
lib.read = (folder, file, callback) => {
	// Open folder and read file
	readFile(lib.baseDir + folder + "/" + file + ".json", "utf-8", (err, data) => {
		if (!err && data) {
			var parsedData = parseObject(data);
			callback(false, parsedData);
		} else {
			callback(err, data);
		}
	});
};

// Update or Edit files
// ==================================================================================
lib.update = (folder, file, data, callback) => {
	// Open folder and file for update
	open(lib.baseDir + folder + "/" + file + ".json", "r+", (err, fileDescriptor) => {
		if (!err && fileDescriptor) {
			// Truncate the file
			truncate(fileDescriptor, (err) => {
				if (!err) {
					// Stringify data to  be saved
					dataStr = JSON.stringify(data);
					// Update old file with new one
					writeFile(fileDescriptor, dataStr, (err) => {
						if (!err) {
							// Close file
							close(fileDescriptor, (err) => {
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
lib.list = (folder, callback) => {
	readdir(lib.baseDir + folder + "/", (err, files) => {
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
lib.delete = (folder, file, callback) => {
	// open folder ton delete file
	unlink(lib.baseDir + folder + "/" + file + ".json", (err) => {
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
