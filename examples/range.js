
/**
 * Module dependencies.
 */

var Enumerable = require('..');

function Range(from, to) {
  this.from = from;
  this.to = to;
}

Enumerable.mixin(Range.prototype, function () {
	var i = this.from
	  , res = []
	while (i <= this.to)
		res.push(i)
	return res
});

var range = new Range(5, 10);

range.each(function(n, i){
  console.log(n);
})
