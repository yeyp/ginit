const { Spinner } = require('clui');
const Configstore = require('configstore');
const { Octokit } = require('@octokit/rest')
const { createBasicAuth } = require('@octokit/auth-basic');

const inquirer = require('./inquirer');
const pkg = require('../package.json');
const files = require('./files');

// 初始化本地存储配置
const config = new Configstore(pkg.name);

let octokit;

module.exports = {
    // 通过token登陆
    githubAuth: (token) => {
        octokit = new Octokit({
            auth: token,
        });
    },

    // 获取octokit实例
    getInstance: () => octokit,

    // 获取本地token
    getStoredGithubToken: () => config.get('github.token'),

    // 引导用户生成自己的AccessToken，并上传
    getPersonalAccessToken: async () => {
        const credentials = await inquirer.askGithubAccessToken();

        config.set('github.token', credentials.token);
        return credentials.token;
    }
}
