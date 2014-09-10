#obus [![Build Status](https://travis-ci.org/fistlabs/obus.svg?branch=master)](https://travis-ci.org/fistlabs/obus)

```obus``` is an object deep getter/setter supporting syntax escaping

##Usage
```js
var Obus = require('obus');
var obus = new Obus({});

obus.set('a.b.c', 42);
```

##API
###```Obus new Obus([* root])```
Creates new ```Obus``` object, wrapper over the ```root``` argument
```js
var obus = new Obus({});
```
###```Object obus.valueOf()```
Returns the object passed to ```Obus``` constructor.
```js
var obus = new Obus({a: 42});
obus.valueOf(); // -> {a: 42}
```
###```* obus.get(String path[, * defaultValue])```
Returns the value placed deep in object according to given path. Returns the second argument if returning value is falsy (```undefined```)
```js
var obus = new Obus({a: {b: 42}});
obus.get('a.b'); // -> 42
obus.get('a.b.c'); // -> undefined
obus.get('a.b.c', 42); // -> 42
```

###```Obus obus.set(String path, * data)```
Puts the given object deep into object according to given path
```js
var obus = new Obus({});
obus.set('a.b.c', 42);
obus.valueOf(); // -> {a: {b: {c: 42}}}
```
###```Boolean obus.del(String path)```
Deletes data from given path. Returns true if the data was deleted else false
```js
var obus = new Obus({a: 42});
obus.del('a'); // -> true
obus.del('a'); // -> false
```

###```Boolean obus.has(String path)```
Checks if any truey (not ```undefined```) data placed by the given path
```js
var obus = new Obus({a: {b: 42}});
obus.has('a.b'); // -> true
obus.has('a'); // -> true
obus.has('a.b.c'); // -> false
```

###```Obus obus.add(String path, * data)```
Merges existing data with the given one
```js
var obus = new Obus({a: {b: 42}});
obus.add('a', {c: 42}).valueOf(); // -> {a: {b: 42, c: 42}}
obus.add('a.b', 43).valueOf(); // -> {a: {b: [42, 43], c: 42}}
obus.add('a', {c: 43}).valueOf(); // -> {a: {b: [42, 43], c: [42, 43]}}
```
##License
[MIT](LICENSE)
