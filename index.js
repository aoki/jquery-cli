#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version(require('./package.json').version)
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

// console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);

var input = '';
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) { input += data; });

process.stdin.on('end', function() {
	var body = input;
	var jsdom = require('jsdom').jsdom;
	var document = jsdom(body, {});
	var window = document.defaultView;
	var $ = require('jquery')(window);

  console.log(eval('$(body).find("#colors").html()'));
});

function readFile(path) {
	var jsdom = require('jsdom').jsdom;
	var fs = require('fs');

	fs.readFile(path, function (err, data) {
		if (err) throw err;

		var body = data.toString();
		var document = jsdom(body, {});
		var window = document.defaultView;
		var $ = require('jquery')(window);
		console.log($(body).find('#colors').html());
	});
}
