<img src="https://crossbrowsertesting.com/design/images/cbt-sb_logo.svg" width="50%">
----
# Mocha and CBT

[**Mocha**](http://mochajs.org/) is a powerful and easy to use testing framework for Node.js. Its power comes from its flexibility. With support for all the popular test writing styles (BDD, TDD, Exports, QUnit or Require) and seemingly endless ways to output test results, it's no wonder Mocha has a [**94% satisfaction rating**](http://stateofjs.com/2016/testing/) among those who have used it.

## Install and Setup

Unlike other frameworks, it's dead simple to get started with Mocha. 

To install Mocha globally:
```
$ npm install -g mocha
```

To install Mocha as a project dependency:
```
$ npm install --save-dev mocha
```

Once Mocha is installed, the only other setup you'll need to do is create a `test` directory in your project root. That's where Mocha will look for `*.js` (or, alternatively, `*.coffee`) files to run.

#### Optional: Install an Assertion library

You can use Node's built-in `assert()` function in your automated tests, but great tests require more nuanced assertions than `assert()` allows. If you have a favorite assertion library, go ahead and use it. If you don't, I recommend [**Chai**](http://chaijs.com/api/assert/). Install it the same way we installed Mocha: 

Globally:

```
$ npm install -g chai
```

Or for your project:

```
$ npm install --save-dev chai
```

## Writing Tests

For this example we'll be testing a simple [login page](https://crossbrowsertesting.github.io/login-form.html) to make sure that it rejects bad login attempts, and accepts good login attempts.

Definitely take a look at the example test in this repo! It's heavily commented, so hopefully it's easy to read and understand. 

The basic structure of each test is as follows:

* Each test suite, or "feature", is enclosed in a `describe()` block.
* For each `describe()` block, you can call special methods `before()`, `after()`, `beforeEach()`, and `afterEach()`. Those methods will run before the whole suite, after the whole suite, before each test case, and after each test case, respectively.
* Tests are defined by calling `it()` inside a `describe()` block.
* Each function inside a `describe()` block will block execution of other tests until `done()` is called.

Here's an example of a simple test of a function that adds two numbers together and returns a promise. Before each test we call a `reset` method on the adder. We also have a `cleanUp` function at the bottom to where we would put any test cleanup code.

```javascript

describe("number adder"{
    beforeEach(function resetAdder(done){
        numberAdder.reset()
        .then(done);
    });
    it("returns the sum of two positive numbers", function(done){
        numberAdder(7,3)
        .then(function(result){
            assert(result == 10);
        })
        .then(done);
    });
    it("returns the sum of a positive and negative number", {
        numberAdder(7,-3)
        .then(function(result){
            assert(result == 4);
        })
        .then(done);
    });
    after(function cleanUp(done){
        // any test cleanup
        done();
    })
});
```

Take a look at `login.js` and you'll see a very similar structure.

## Running tests

To run your tests, just navigate to the root project folder and run `$ mocha`. It's that easy!

## Help!

If you got stuck, or something doesn't make sense, don't worry! Just shoot an email to info@crossbrowsertesting.com and we'll help you out.

Happy testing!
