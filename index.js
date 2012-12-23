
/**
 * Module dependencies.
 */

var toFunction = require('to-function')
  , proto = {}

/**
 * Return a string representation of this enumerable.
 *
 *    [Enumerable [1,2,3]]
 *
 * @return {String}
 * @api public
 */

proto.inspect =
proto.toString = function(){
	return '[Enumerable ' + JSON.stringify(this) + ']'
}

/**
 * Return the number of items
 *
 * @return {Number} item count
 * @api public
 */
proto.length = function () {
	return this.value.length
}

/**
 * Iterate each value and invoke `fn(val, i)`.
 *
 *    users.each(function(val, i){})
 *
 * @param {Function} fn
 * @return {Object} self
 * @api public
 */

proto.each = function(fn){
	var vals = this.value
	  , len = vals.length
	  , i = 0
	while (i < len) {
		fn(vals[i], i++)
	}
	return this
}

/**
 * Map each return value from `fn(val, i)`.
 *
 * Passing a callback function:
 *
 *    users.map(function(user){
 *      return user.name.first
 *    })
 *
 * Passing a property string:
 *
 *    users.map('name.first')
 *
 * @param {Function} fn
 * @return {Enumerable}
 * @api public
 */

proto.map = function(fn){
	if (typeof fn === 'string') fn = toFunction(fn)
	var vals = this.value
	  , len = vals.length
	  , arr = new Array(len)
	for (var i = 0; i < len; ++i) {
		arr[i] = fn(vals[i], i)
	}
	return new this.constructor(arr)
}

/**
 * Select all values that return a truthy value of `fn(val, i)`.
 *
 *    users.select(function(user){
 *      return user.age > 20
 *    })
 *
 *  With a property:
 *
 *    items.select('complete')
 *
 * @param {Function|String} fn
 * @return {Enumerable}
 * @api public
 */

proto.select = function(fn){
	if (typeof fn === 'string') fn = toFunction(fn)
	var arr = []
	  , vals = this.value
	  , len = vals.length
	for (var i = 0; i < len; ++i) {
		if (fn(vals[i], i)) arr.push(vals[i])
	}
	return new this.constructor(arr)
}

/**
 * Select all unique values.
 *
 *    nums.unique()
 *
 * @return {Enumerable}
 * @api public
 */

proto.unique = function(){
	var arr = []
	  , vals = this.value
	  , len = vals.length
	for (var i = 0; i < len; ++i) {
		if (~arr.indexOf(vals[i])) continue
		arr.push(vals[i])
	}
	return new this.constructor(arr)
}

/**
 * Reject all values that return a truthy value of `fn(val, i)`.
 *
 * Rejecting using a callback:
 *
 *    users.reject(function(user){
 *      return user.age < 20
 *    })
 *
 * Rejecting with a property:
 *
 *    items.reject('complete')
 *
 * @param {Function|String|Mixed} fn
 * @return {Enumerable}
 * @api public
 */

proto.reject = function(fn){
	var arr = []
	  , vals = this.value
	  , len = vals.length

	if (typeof fn === 'string') fn = toFunction(fn)
	if (fn == null) return this.compact()
	
	for (var i = 0; i < len; ++i)
		if (!fn(vals[i], i)) arr.push(vals[i])

	return new this.constructor(arr)
}

/**
 * Reject `null` and `undefined`.
 *
 *    [1, null, 5, undefined].compact()
 *    // => [1,5]
 *
 * @return {Enumerable}
 * @api public
 */


proto.compact = function(){
	return new this.constructor(
		this.value.filter(function (val) {return val != null})
	)
}

/**
 * Return the first value when `fn(val, i)` is truthy,
 * otherwise return `undefined`.
 *
 *    users.find(function(user){
 *      return user.role == 'admin'
 *    })
 *
 * With a property string:
 *
 *    users.find('age > 20')
 *
 * @param {Function|String} fn
 * @return {Mixed}
 * @api public
 */

proto.find = function(fn){
	if (typeof fn === 'string') fn = toFunction(fn)
	var vals = this.value
	  , len = vals.length
	for (var i = 0; i < len; ++i) {
		if (fn(vals[i], i)) return vals[i]
	}
}

/**
 * Return the last value when `fn(val, i)` is truthy,
 * otherwise return `undefined`.
 *
 *    users.findLast(function(user){
 *      return user.role == 'admin'
 *    })
 *
 * @param {Function} fn
 * @return {Mixed}
 * @api public
 */

proto.findLast = function(fn){
	if (typeof fn === 'string') fn = toFunction(fn)
	var vals = this.value
	  , i = vals.length
	while (i--) {
		if (fn(vals[i], i)) return vals[i]
	}
}

/**
 * Assert that all invocations of `fn(val, i)` are truthy.
 *
 * For example ensuring that all pets are ferrets:
 *
 *    pets.all(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 *    users.all('admin')
 *
 * @param {Function|String} fn
 * @return {Boolean}
 * @api public
 */

proto.all =
proto.every = function(fn){
	if (typeof fn === 'string') fn = toFunction(fn)
	var vals = this.value
	  , i = vals.length
	while (i--) {
		if (!fn(vals[i], i)) return false
	}
	return true
}

/**
 * Assert that none of the invocations of `fn(val, i)` are truthy.
 *
 * For example ensuring that no pets are admins:
 *
 *    pets.none(function(p){ return p.admin })
 *    pets.none('admin')
 *
 * @param {Function|String} fn
 * @return {Boolean}
 * @api public
 */

proto.none = function(fn){
	if (typeof fn === 'string') fn = toFunction(fn)
	var vals = this.value
	  , i = vals.length
	while (i--) {
		if (fn(vals[i], i)) return false
	}
	return true
}

/**
 * Assert that at least one invocation of `fn(val, i)` is truthy.
 *
 * For example checking to see if any pets are ferrets:
 *
 *    pets.any(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api public
 */
proto.some = 
proto.any = function(fn){
	if (typeof fn === 'string') fn = toFunction(fn)
	var vals = this.value
	  , i = vals.length
	while (i--) {
		if (fn(vals[i], i)) return true
	}
	return false
}

/**
 * Count the number of times `fn(val, i)` returns true.
 *
 *    var n = pets.count(function(pet){
 *      return pet.species == 'ferret'
 *    })
 *
 * @param {Function} fn
 * @return {Number}
 * @api public
 */

proto.count = function(fn){
	var vals = this.value
	  , i = vals.length
	  , n = 0
	while (i--) {
		if (fn(vals[i], i)) ++n
	}
	return n
}

/**
 * Determine the indexof `obj` or return `-1`.
 *
 * @param {Mixed} obj
 * @return {Number}
 * @api public
 */

proto.indexOf = function(obj){
	var vals = this.value
	  , len = vals.length
	for (var i = 0; i < len; ++i) {
		if (vals[i] === obj) return i
	}
	return -1
}

/**
 * Check if `obj` is present in this enumerable.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api public
 */

proto.has = function(obj){
	return !! ~this.indexOf(obj)
}

/**
 * Grep values using the given `re`.
 *
 *    users.map('name').grep(/^tobi/i)
 *
 * @param {RegExp} re
 * @return {Enumerable}
 * @api public
 */

proto.grep = function(re){
	var vals = this.value
	  , len = vals.length
	  , arr = []
	for (var i = 0; i < len; ++i) {
		if (re.test(vals[i])) arr.push(vals[i])
	}
	return new this.constructor(arr)
}

/**
 * Reduce with `fn(accumulator, val, i)` using
 * optional `init` value defaulting to the first
 * enumerable value.
 *
 * @param {Function} fn
 * @param {Mixed} [val]
 * @return {Mixed}
 * @api public
 */

proto.reduce = function(fn, init){
	var i = 0
	  , vals = this.value
	  , len = vals.length

	var val = (null == init
		? vals[i++]
		: init)

	while (i < len) {
		val = fn(val, vals[i], i++)
	}

	return val
}

/**
 * Determine the max value.
 *
 * With a callback function:
 *
 *    pets.max(function(pet){
 *      return pet.age
 *    })
 *
 * With property strings:
 *
 *    pets.max('age')
 *
 * With immediate values:
 *
 *    nums.max()
 *
 * @param {Function|String} fn
 * @return {Number}
 * @api public
 */

proto.max = function(fn){
	var max = -Infinity
	  , vals = this.value
	  , i = vals.length

	if (fn) {
		if (typeof fn === 'string') fn = toFunction(fn)
		var n
		while (i--)
			if ((n = fn(vals[i], i)) > max) max = n
	} 
	else
		while (i--)
			if (vals[i] > max) max = vals[i]

	return max
}

/**
 * Determine the sum.
 *
 * With a callback function:
 *
 *    pets.sum(function(pet){
 *      return pet.age
 *    })
 *
 * With property strings:
 *
 *    pets.sum('age')
 *
 * With immediate values:
 *
 *    nums.sum()
 *
 * @param {Function|String} fn
 * @return {Number}
 * @api public
 */

proto.sum = function(fn){
	var ret
	  , n = 0
	  , vals = this.value
	  , i = vals.length

	if (fn) {
		if (typeof fn === 'string') fn = toFunction(fn)
		while (i--) 
			n += fn(vals[i], i)
	}
	else
		while (i--) 
			n += vals[i]

	return n
}

/**
 * Determine the average value.
 *
 * With a callback function:
 *
 *    pets.avg(function(pet){
 *      return pet.age
 *    })
 *
 * With property strings:
 *
 *    pets.avg('age')
 *
 * With immediate values:
 *
 *    nums.avg()
 *
 * @param {Function|String} fn
 * @return {Number}
 * @api public
 */

proto.avg =
proto.mean = function(fn){
	return this.sum(fn) / this.value.length
}

/**
 * Return the first value, or first `n` values.
 *
 * @param {Number|Function} [n]
 * @return {Array|Mixed}
 * @api public
 */

proto.first = function(n){
	if (n) {
		if (typeof n === 'function') return this.find(n)
		var vals = this.value
		return vals.slice(0, Math.min(n, vals.length))
	}
	return this.value[0]
}

/**
 * Return the last value, or last `n` values.
 *
 * @param {Number|Function} [n]
 * @return {Array|Mixed}
 * @api public
 */

proto.last = function(n){
	if ('function' == typeof n) return this.findLast(n)
	var vals = this.value
	  , len = vals.length

	if (n) {
		var i = Math.max(0, len - n)
		  , arr = []
		while (i < len)
			arr.push(vals[i++])
		return arr
	}

	return vals[len - 1]
}

/**
 * Return values in groups of `n`.
 *
 * @param {Number} n
 * @return {Enumerable}
 * @api public
 */

proto.inGroupsOf = function(n){
	var arr = []
	  , group = []
	  , vals = this.value
	  , len = vals.length

	for (var i = 0; i < len; ++i) {
		group.push(vals[i])
		if ((i + 1) % n === 0) {
			arr.push(group)
			group = []
		}
	}

	if (group.length) arr.push(group)

	return new this.constructor(arr)
}

/**
 * Return the value at the given index.
 *
 * @param {Number} i
 * @return {Mixed}
 * @api public
 */

proto.at = function(i){
	return this.value[i]
}

/**
 * Return a regular `Array`.
 *
 * @return {Array}
 * @api public
 */

proto.valueOf = 
proto.toJSON =
proto.array = function(){
	return this.value
}

/**
 * Create the protocol
 */
var Enumerable = require('protocol')(proto)

/**
 * Register the Array type against the protocol
 */
Enumerable.implement(Array)

/**
 * Expose `Enumerable`.
 */

module.exports = Enumerable

Enumerable.mixin = function (obj, get) {
	Object.defineProperty(obj, 'value', {
		get: get || function () {return this}
	})
	Object.keys(Enumerable.interface).forEach(function (key) {
		obj[key] = Enumerable.interface[key]
	})
	return obj
}
