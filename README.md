# mysql-json
=========

Simple Node.js mysql module

## Installation

  npm install mysql-json

## Usage

<pre><code>
  var MysqlJson = require('mysql-json');
</code></pre>

<pre><code>
  var mysqlJson = new MysqlJson({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'myDatabase'
  });
</code></pre>

<pre><code>
  mysqlJson.query("SELECT * FROM users WHERE login LIKE '%admin%'", function(err, response) {
    if (err) throw err;
    console.log(response);
  });
</code></pre>

<pre><code>
  mysqlJson.insert('myTable', {
    login:'root',
    firstName:'John',
    lastName:'Doe',
    age:45
  }, function(err, response) {
    if (err) throw err;
    console.log(response);
  });
</code></pre>

<pre><code>
  mysqlJson.update('myTable', {
    lastName:'Foo',
    age:27
  }, {
  login:{operator:'=', value:'root'}
  }, function(err, response) {
    if (err) throw err;
    console.log(response);
  });
</code></pre>

<pre><code>
  mysqlJson.delete('myTable', {
    login:'root'
  }, function(err, response) {
    if (err) throw err;
    console.log(response);
  });
</code></pre>


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
