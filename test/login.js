var webdriver = require('selenium-webdriver');
var request = require('request');
var assert = require('chai').assert;

var remoteHub = 'http://hub.crossbrowsertesting.com:80/wd/hub';

var username = 'johnr@crossbrowsertesting.com'; // replace with your email address 
var authkey = 'secretauthkey'; // replace with your authkey 
 
var caps = {
    name : 'Login',
    build :  '1.0.0',
    browser_api_name : 'IE10', 
    os_api_name : 'Win7x64-C2', 
    screen_resolution : '1024x768',
    record_video : 'true',
    record_network : 'true',
    browserName : 'internet explorer', // <---- this needs to be the browser type in lower case: firefox, internet explorer, chrome, opera, or safari
    username : username,
    password : authkey
};

describe("Login form", function(){
    
    // set the timeout for each test in this block to 5 minutes
    this.timeout(5 * 1000 * 60);

    // Create the webdriver object on the block level so that it can be accessed by the tests below
    var driver = new webdriver.Builder()
        .usingServer(remoteHub)
        .withCapabilities(caps)
        .build();

    // This function runs before each "it" block below
    // Here, it resets the driver back to the correct page.
    // This is also where we would reset cookies and other browser data we don't want to 
    // persist between test blocks
    beforeEach(function setupWebdriver(done){
        driver.get("http://crossbrowsertesting.github.io/login-form.html").then( done ) 
    });

    // Each "it" block describes one test scenario
    // The first argument is documentation for the test
    it("rejects bad login credentials", function(done){
        // Enter username
        var username = driver.findElement(webdriver.By.id("username"));
        username.click()
        .then(function(){username.sendKeys("username"); } )

        // Enter password
        var password = driver.findElement(webdriver.By.id("password"));
        password.click()
        .then(function(){password.sendKeys("password"); } )

        // Click "Login"
        driver.findElement(webdriver.By.css("div.form-actions>button")).click()

        // Check that the login was rejected
        .then(function(){
            return driver.wait(webdriver.until.elementLocated(webdriver.By.css(".alert")), 5000)
        })
        .then(function(element){
            return element.getText();
        })
        .then(function(text){
            assert.deepEqual( text,  "Username or password is incorrect" );
        })
        .then(done);

    });

    it("accepts good login credentials", function(done){

        var username = driver.findElement(webdriver.By.id("username"));
        username.click()
        .then(function(){username.sendKeys("tester@crossbrowsertesting.com"); } )

        var password = driver.findElement(webdriver.By.id("password"));
        password.click()
        .then(function(){password.sendKeys("test123"); } )

        driver.findElement(webdriver.By.css("div.form-actions>button")).click()

        .then(function(){
            return driver.wait(webdriver.until.elementLocated(webdriver.By.css("#logged-in-message > h2")), 5000)
        })
        .then(function(element){
            return element.getText();
        })
        .then(function(text){
            assert.deepEqual(text, "Welcome tester@crossbrowsertesting.com");
        })
        .then(done);
    });

    // The after block is run after all "it" blocks finish.
    // If driver.quit() isn't called, the session will remain open until the default 10 minute timeout is reached.
    after(function quitWebdriver(done){
        driver.quit()
        .then(done);
    });
});