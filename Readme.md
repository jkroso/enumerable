# Enumerable

  Enumerable mixin.

```js
users
  .map('friends')
  .select('age > 20')
  .map('name.first')
  .grep(/^T/)
```

 Enumerable protocol

```js
Enumerable(users)
  .map('friends')
  .select('age > 20')
  .map('name.first')
  .grep(/^T/)
```

## Installation

  $ component install component/enumerable  
  $ npm install component-enumerable

## API

  - [Enumerable.each()](#protoeachfnfunctionstring)
  - [Enumerable.map()](#protomapfnfunction)
  - [Enumerable.select()](#protoselectfnfunctionstring)
  - [Enumerable.unique()](#protounique)
  - [Enumerable.reject()](#protorejectfnfunctionstringmixed)
  - [Enumerable.compact()](#protocompact)
  - [Enumerable.find()](#protofindfnfunctionstring)
  - [Enumerable.findLast()](#protofindlastfnfunction)
  - [Enumerable.none()](#protononefnfunctionstring)
  - [Enumerable.some](#protosome)
  - [Enumerable.count()](#protocountfnfunction)
  - [Enumerable.indexOf()](#protoindexofobjmixed)
  - [Enumerable.has()](#protohasobjmixed)
  - [Enumerable.reduce()](#protoreducefnfunctionvalmixed)
  - [Enumerable.max()](#protomaxfnfunctionstring)
  - [Enumerable.sum()](#protosumfnfunctionstring)
  - [Enumerable.first()](#protofirstnnumber)
  - [Enumerable.last()](#protolastnnumber)
  - [Enumerable.inGroupsOf()](#protoingroupsofnnumber)
  - [Enumerable.at()](#protoatinumber)
  - [Enumerable.value](#protovalue)

## Enumerable.each(fn:Function|String)

  Iterate each value and invoke `fn(val, i)`.
  If `fn` is a string then the items will have 
  their corresponding method called with any
  additional arguments you pass
  
```js
 users.each(function(val, i){})
 user.each('save')
```

## Enumerable.map(fn:Function)

  Map each return value from `fn(val, i)`.
  
  Passing a callback function:
  
```js
 users.map(function(user){
   return user.name.first
 })
```

  
  Passing a property string:
  
```js
 users.map('name.first')
```

## Enumerable.select(fn:Function|String)

  Select all values that return a truthy value of `fn(val, i)`.
  
```js
 users.select(function(user){
   return user.age > 20
 })
```

  
   With a property:
  
```js
 items.select('complete')
```

## Enumerable.unique()

  Select all unique values.
  
```js
 nums.unique()
```

## Enumerable.reject(fn:Function|String|Mixed)

  Reject all values that return a truthy value of `fn(val, i)`.
  
  Rejecting using a callback:
  
```js
 users.reject(function(user){
   return user.age < 20
 })
```

  
  Rejecting with a property:
  
```js
 items.reject('complete')
```

## Enumerable.compact()

  Reject `null` and `undefined`.
  
```js
 [1, null, 5, undefined].compact()
 // => [1,5]
```

## Enumerable.find(fn:Function|String)

  Return the first value when `fn(val, i)` is truthy,
  otherwise return `undefined`.
  
```js
 users.find(function(user){
   return user.role == 'admin'
 })
```

  
  With a property string:
  
```js
 users.find('age > 20')
```

## Enumerable.findLast(fn:Function)

  Return the last value when `fn(val, i)` is truthy,
  otherwise return `undefined`.
  
```js
 users.findLast(function(user){
   return user.role == 'admin'
 })
```

## Enumerable.none(fn:Function|String)

  Assert that none of the invocations of `fn(val, i)` are truthy.
  
  For example ensuring that no pets are admins:
  
```js
 pets.none(function(p){ return p.admin })
 pets.none('admin')
```

## Enumerable.some

  Assert that at least one invocation of `fn(val, i)` is truthy.
  
  For example checking to see if any pets are ferrets:
  
```js
 pets.any(function(pet){
   return pet.species == 'ferret'
 })
```

## Enumerable.count(fn:Function)

  Count the number of times `fn(val, i)` returns true.
  
```js
 var n = pets.count(function(pet){
   return pet.species == 'ferret'
 })
```

## Enumerable.indexOf(obj:Mixed)

  Determine the indexof `obj` or return `-1`.

## Enumerable.has(obj:Mixed)

  Check if `obj` is present in this enumerable.

## Enumerable.reduce(fn:Function, [val]:Mixed)

  Reduce with `fn(accumulator, val, i)` using
  optional `init` value defaulting to the first
  enumerable value.

## Enumerable.max(fn:Function|String)

  Determine the max value.
  
  With a callback function:
  
```js
 pets.max(function(pet){
   return pet.age
 })
```

  
  With property strings:
  
```js
 pets.max('age')
```

  
  With immediate values:
  
```js
 nums.max()
```

## Enumerable.sum(fn:Function|String)

  Determine the sum.
  
  With a callback function:
  
```js
 pets.sum(function(pet){
   return pet.age
 })
```

  
  With property strings:
  
```js
 pets.sum('age')
```

  
  With immediate values:
  
```js
 nums.sum()
```

## Enumerable.first([n]:Number)

  Return the first value, or first `n` values.

## Enumerable.last([n]:Number)

  Return the last value, or last `n` values.

## Enumerable.inGroupsOf(n:Number)

  Return values in groups of `n`.

## Enumerable.at(i:Number)

  Return the value at the given index.

## Enumerable.value

  Return a regular `Array`.

## License

  MIT


