/*
 *
 * Script for other things
 *
 */

// Dependencies
// ====================================================================
const https = require("node:https")
const stringDecoder = require("node:string_decoder").StringDecoder
const fs = require("node:fs")
var path = require("node:path");
var config = require("./config");

// Container for helpers
// ===================================================================
var helpers = {};

// Parse a JSON string object in all cases without throwing
helpers.parseJsonToObject = (str) => {
	try {
		var obj = JSON.parse(str);
		return obj;
	} catch (error) {
		return error;
	}
};

// Interpolate Template
helpers.interpolateTemplate = (templateData, data) => {
	templateData = typeof templateData == "string" && templateData.length > 0 ? templateData : false;
	data = typeof data == "object" && data !== null ? data : {};

	// Add the template globals to the data
	for (var keyName in config.templateGlobals) {
		if (config.templateGlobals.hasOwnProperty(keyName)) {
			data["global." + keyName] = config.templateGlobals[keyName];
		}
	}

	// for each key in the data object, insert its value into the templateData
	for (var key in data) {
		if (data.hasOwnProperty(key) && typeof (data[key] == "string")) {
			var replacement = data[key];
			var whatToReplace = "{" + key + "}";
			templateData = templateData.replace(whatToReplace, replacement);
		}
	}

	return templateData;
};

// Get the string content of a template
helpers.getTemplate = (templateName, data, callback) => {
	// Sanity check
	templateName = typeof templateName == "string" && templateName.length > 0 ? templateName : false;
	data = typeof data == "object" && data !== null ? data : false;
	if (templateName) {
		var templateDir = path.join(__dirname, "./../templates/");
		fs.readFile(templateDir + templateName + ".html", "utf-8", (err, templateData) => {
			if (!err && templateData) {
				// interpolate template
				callback(false, helpers.interpolateTemplate(templateData, data));
			} else {
				callback(true, "Template Not found");
			}
		});
	} else {
		callback(true, "Invalid Template");
	}
};

// Get Full Template String
helpers.getFullTemplate = (templateData, data, callback) => {
	// Sanity Check
	templateData = typeof templateData == "string" && templateData.length > 0 ? templateData : false;
	data = typeof data == "object" && data !== null ? data : {};

	// Get Header
	helpers.getTemplate("header", data, (err, headerString) => {
		if (!err && headerString) {
			// Get Footer
			helpers.getTemplate("footer", data, (err, footerString) => {
				if (!err && footerString) {
					// Concatenate them together
					var FullTemplate = headerString + templateData + footerString;
					callback(false, FullTemplate);
				} else {
					callback(true, "Could Not Find Footer Template");
				}
			});
		} else {
			callback(true, "Could Not Find Header Template");
		}
	});
};

// Static Assets
helpers.getStaticAssets = (fileName, callback) => {
	fileName = typeof fileName == "string" && fileName.length > 0 ? fileName : false;
	if (fileName) {
		var publicDir = path.join(__dirname, "/../public/");
		fs.readFile(publicDir + fileName, (err, data) => {
			if (!err && data) {
				callback(false, data);
			} else {
				callback(true, "Could Not Find File");
			}
		});
	} else {
		callback(true, "Invalid File Name");
	}
};

// Fetch Module
helpers.fetch = (link, callback) => {
	https.get(link, (res) => {
		// const statusCode = res.statusCode
		const headers = res.headers
		const decoder = new stringDecoder("utf8")
		let file = ""

		res.on("data", (data) => {
			file += decoder.write(data)
		})

		res.on("end", () => {
			file += decoder.end()

			// Return
			callback(false, headers["content-type"].indexOf("application/json") > -1 ? helpers.parseJsonToObject(file) : file)
		})
	}).on("error", (e) => {
		console.log("Error: " + e.message)
		callback(true, e.message)
	})
}

// Export module
// ===================================================================
module.exports = helpers;
