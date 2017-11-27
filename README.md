# mysql-json
=========

Simple Node.js mysql module using [mysql] (https://github.com/mysqljs/mysql)

## Installation

npm install mysql-json

## Declaration

```javascript
    var MysqlJson = require('mysql-json');
    var mysqlJson = new MysqlJson(options); // Takes mysql package options
```

## Methods

All methods take a callback which is called with 2 parameters (err, response)

```javascript
    // Used to return a mysql connection
    mysqlJson.connect(callback);
```

```javascript
    // Used to launch a query to mysql server
    mysqlJson.query(mysqlQuery, callback);
```

```javascript
    // Used to find a row by primary key
    mysqlJson.findByPrimaryKey(tableName, id, callback);
```

```javascript
    // Used to insert a new row with JSON data
    mysqlJson.insert(tableName, dataToInsert, callback);
```

```javascript
    // Used to update some row(s) matching with JSON conditions
    mysqlJson.update(tableName, data, conditions, callback);
```

```javascript
    // Used to delete some row(s) matching with JSON conditions
    mysqlJson.delete(tableName, conditions, callback);
```

Condition Objects has to be build with this schema :

```javascript
{
    column1: {operator:'=', value:'test'},
    column2: {operator:'>', value:29},
}
```

## Usage

```javascript
  // Initialization
  var MysqlJson = require('mysql-json');
  var mysqlJson = new MysqlJson({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'myDatabase'
  });
```

```javascript
  // Query method
  mysqlJson.query("SELECT * FROM users WHERE login LIKE '%admin%'", function(err, response) {
    if (err) throw err;
    console.log(response);
  });
```

```javascript
  // Find a document where Primary Key = 1
  mysqlJson.findByPrimaryKey('myTable', 1, function(err, response) {
    if (err) throw err;
    console.log(response);
  });
```

```javascript
  // Insert new document with login=root, firstname=John, lastName=Doe, Age=45
  mysqlJson.insert('myTable', {
    login:'root',
    firstName:'John',
    lastName:'Doe',
    age:45
  }, function(err, response) {
    if (err) throw err;
    console.log(response);
  });
```

```javascript
  // Update any documents and set lastname=foo, age=47 where login=root
  mysqlJson.update('myTable',
  {lastName:'Foo', age:27},
  {login:{operator:'=', value:'root'}},
  function(err, response) {
    if (err) throw err;
    console.log(response);
  });
```

```javascript
  // Delete any documents where login=root
  mysqlJson.delete('myTable', {
    login:{operator:'=', value:'root'}
  }, function(err, response) {
    if (err) throw err;
    console.log(response);
  });
```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
