const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const github = require('./lib/github');
const repo = require('./lib/repo');

// 清除命令行
clear();

// 输出Logo
console.log(chalk.greenBright(figlet.textSync('Ginit', {horizontalLayout: 'full'})));

// 判断是否存在.git文件
if (files.directoryExists('.git')) {
    console.log(chalk.red('已经存在本地仓库！'));
    process.exit();
}

// 获取github token
const getGithubToken = async () => {
    // 从本地获取token记录
    let token = github.getStoredGithubToken();
    if (token) {
        return token;
    }

    // 引导用户生成自己的AccessToken，并上传
    token = await github.getPersonalAccessToken();
    return token;
};

const run = async () => {
    // 获取token
    const token = await getGithubToken();
    github.githubAuth(token);

    // 创建远程仓库
    const url = await repo.createRemoteRepo();

    // 创建 .gitignore
    await repo.createGitignore();

    // 创建 README
    await repo.createReadme();

    // 初始化本地仓库并推送到远端
    await repo.setupRepo(url);

    console.log(chalk.green('All done!'));
}

run();