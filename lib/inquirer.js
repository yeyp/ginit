const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
    askGithubAccessToken: () => {
        const questions = [{
            name: 'token',
            type: 'input',
            message: '请输入Github Access Token:\n（参考文档：https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token）\n',
            validate: function (value) {
                if (value.length === 40) {
                    return true;
                } else {
                    return '请输入正确的Access Token';
                }
            }
        }, ];

        return inquirer.prompt(questions);
    },

    // 询问仓库详细信息
    askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));

        const questions = [{
            type: 'input',
            name: 'name',
            message: '请输入git仓库名称',
            default: argv._[0] || files.getCurrentDirectoryBase(),
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return '请输入git仓库名称';
                }
            }
        }, {
            type: 'input',
            name: 'description',
            default: argv._[1] || null,
            message: '请输入仓库描述（选填）:'
        }, {
            type: 'list',
            name: 'visibility',
            message: '共有仓库 或 私有仓库:',
            choices: ['public', 'private'],
            default: 'public'
        }];

        return inquirer.prompt(questions);
    },

    // 选择需要忽略的文件
    askIgnoreFiles: (fileList) => {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: '请选择你想要忽略的文件:',
                choices: fileList,
                default: ['node_modules', 'bower_components'],
            },
        ];
        return inquirer.prompt(questions);
    },
}