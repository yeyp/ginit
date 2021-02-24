var os = require('os');
var clui = require('clui');

/**
 * 列表
 */
//     clc = require('cli-color'),
//     Line = clui.Line;

// var headers = new Line()
//   .padding(2)
//   .column('Column One', 20, [clc.cyan])
//   .column('Column Two', 20, [clc.cyan])
//   .column('Column Three', 20, [clc.cyan])
//   .column('Column Four', 20, [clc.cyan])
//   .fill()
//   .output();

// var line = new Line()
//   .padding(2)
//   .column((Math.random()*100).toFixed(3), 20)
//   .column((Math.random()*100).toFixed(3), 20)
//   .column((Math.random()*100).toFixed(3), 20)
//   .column((Math.random()*100).toFixed(3), 20)
//   .fill()
//   .output();


/**
 * 比例图
 */
// var Gauge = clui.Gauge;

// var total = os.totalmem();
// var free = os.freemem();
// var used = total - free;
// var human = Math.ceil(used / 100000) + 'MB';
// console.log(used, free, total)

// console.log(Gauge(used, total, 100, total * 0.85, human))

/**
 * 柱状图
 */
// var Sparkline = require('clui').Sparkline;
// var reqsPerSec = [10,12,3,7,12,9,23,10,9,19,16,18,12,12];
// console.log(Sparkline(reqsPerSec, 'reqs/sec'));

/**
 * 进度图
 */
// var Progress = clui.Progress;

// var thisProcessBar = new Progress(20)
// var total = 50;
// var current = 0;
// console.log(thisProcessBar.update(current, total));
// const timer = setInterval(() => {
//     current += parseInt(Math.random() * 10);
//     console.log(thisProcessBar.update(current, total));
//     if (current >= total) {
//         clearInterval(timer);
//     }
// }, 1000);

var CLI = require('clui'),
    Spinner = CLI.Spinner;

var countdown = new Spinner('Exiting in 10 seconds...  ', ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷']);

countdown.start();

var number = 10;
setInterval(function () {
  number--;
  countdown.message('Exiting in ' + number + ' seconds...  ');
  if (number <= 5) {
        process.stdout.write('\n');
      countdown.message('next message');
  }
  if (number === 0) {
    process.stdout.write('\n');
    process.exit(0);
  }
}, 1000);