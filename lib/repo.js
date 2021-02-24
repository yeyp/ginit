const fs = require('fs');
const touch = require('touch');
const { Spinner } = require('clui');
const git = require('simple-git/promise')();
const _ = require('lodash');

const inquirer = require('./inquirer');
const gh = require('./github');
const files = require('./files');

let reposDesc = {};

module.exports = {
    // 创建远程仓库
    createRemoteRepo: async () => {
        const github = gh.getInstance();
        
        const answers = await inquirer.askRepoDetails();

        const data = {
            name: answers.name,
            description: answers.description,
            private: answers.visibility === 'private',
        };

        reposDesc = data;

        const status = new Spinner('创建远程仓库中...');
        status.start;

        try {
            const resp = await github.repos.createForAuthenticatedUser(data);
            return resp.data.ssh_url;
        } finally {
            status.stop();
        }
    },

    // 创建git ignore
    createGitignore: async () => {
        const fileList = _.without(fs.readdirSync('.'), '.git', '.gitignore');

        if (fileList.length) {
            const answers = await inquirer.askIgnoreFiles(fileList);

            if (answers.ignore.length) {
                // 写入信息
                fs.writeFileSync('.gitignore', answers.ignore.join('\n'));
            } else {
                // 创建文件
                touch('.gitignore');
            }
        } else {
            // 创建文件
            touch('.gitignore');
        }
    },

    // 创建README
    createReadme: async () => {
        if (!files.directoryExists('README.md')) {
            fs.writeFileSync('README.md', reposDesc.name || files.getCurrentDirectoryBase || 'Readme');
        }
    },

    // 设置
    setupRepo: async (url) => {
        const status = new Spinner('初始化本地仓库并推送到远端仓库中...');
        status.start();

        try {
            await git.init();
            await git.add('.gitignore');
            await git.add('./*');
            await git.commit('Initial commit')
            await git.addRemote('origin', url);
            await git.push('origin', 'master');
        } finally {
            status.stop();
        }
    },

}

