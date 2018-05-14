let service = {};

const fs = require('fs');

let configFile = process.env.CONFIG;
let githubUsername = process.env.GITHUB_USERNAME;
let githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;

service.getConfig = () => {
	if (!configFile) {
		configFile = "config.json";
	}
	return JSON.parse(fs.readFileSync(configFile, "UTF-8"));
}

service.getAccessToken = () => {
	try {
		if (!githubAccessToken) {
			githubAccessToken = service.getConfig().github_access_token;
		}
	} catch (err) {
		console.error("Could not find GITHUB_ACCESS_TOKEN in config file or environment.");
		process.exit(1);
	}
	return githubAccessToken;
};

service.getGithubUsername = () => {
	try {
		if (!githubUsername) {
			githubUsername = service.getConfig().github_username;
		}
	} catch (err) {
		console.error("Could not find GITHUB_USERNAME in config file or environment.");
		process.exit(1);
	}
	return githubUsername;
}

module.exports = service;