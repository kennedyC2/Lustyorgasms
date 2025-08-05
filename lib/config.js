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
		// baseUrl: 'http://localhost:2500/',
		baseUrl: ' https://699168b0b08c.ngrok-free.app'
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
		baseUrl: 'https://lustyorgasms.com/'
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
