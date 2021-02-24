const Configstore = require('configstore');
const pkg = require('../package.json');

// 存放在路径：/Users/yeyp/.config/configstore
const config = new Configstore(pkg.name, {foo: 'bar'});
console.log(config.get('foo'));

config.set('awesome', true);
