const axios = require('axios');
const fs = require('fs');
const config = require('./config-loader');

const reposForDeletion = JSON.parse(fs.readFileSync('repos.json'));

function deleteRepos(repos) {
	console.log(`Deleting ${repos ? repos.length : 0} repos`);
	repos.forEach(async repo => {
		const URL = `https://api.github.com/repos/${repo}`;
		await axios({
			method: 'delete',
			url: URL,
			params: {
				access_token: config.getAccessToken(),
			},
		}).then(() => {
			console.log(`${repo} deleted!`);
		}).catch(() => {
			console.error(`${repo} not found...`);
		});
	});
}

deleteRepos(reposForDeletion);