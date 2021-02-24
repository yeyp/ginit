const path = require('path');
const fs = require('fs');

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },

    directoryExists: (filePath) => {
        // 相对路径和绝对路径
        return fs.existsSync(filePath.indexOf('/') === 0 ? filePath : path.resolve(process.cwd(), filePath));
    }
}