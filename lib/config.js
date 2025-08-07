/*
*
* Create and export environment
*
*/

// Container for all environment
// =====================================================================================
var environment = {};

// Staging Environment
environment.staging = {
	httpPort: 2500,
	httpsPort: 2700,
	envName: 'staging',
	templateGlobals: {
		appName: 'Porn Videos',
		companyName: 'lusty<span>ORGASMS</span>',
		yearCreated: '2021',
		baseUrl: 'http://localhost:2500/',
		// google_verification: 'VGxU7B-IkNnDVlh3T_vBwaK_OSC8tLg-SxR23STVxqI',
		// juicyads_verification: 'ef3488534236f1ac61005562fa40aa21'
	}
};

// Production Environment
environment.production = {
	httpPort: 3000,
	httpsPort: 3500,
	envName: 'production',
	templateGlobals: {
		appName: 'Porn Videos',
		companyName: 'lusty<span>ORGASMS</span>',
		yearCreated: '2021',
		baseUrl: 'https://lustyorgasms.com/',
		// google_verification: 'VGxU7B-IkNnDVlh3T_vBwaK_OSC8tLg-SxR23STVxqI',
		// juicyads_verification: 'ef3488534236f1ac61005562fa40aa21'
	}
};

// determine which environment was passed in the command line
var currentEnvironment = typeof process.env.NODE_ENV == 'string' ? process.env.NODE_ENV : '';

// Define which environment gets exported
var environmentToExport =
	typeof environment[currentEnvironment] == 'object' ? environment[currentEnvironment] : environment.staging;

// Export environment
// ========================================================================================
module.exports = environmentToExport;
