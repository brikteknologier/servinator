var assert = require('assert');

var createMockServer = function(callbackOnListen) {
  var givenConfig = null;
  var server = function(config) {
    givenConfig = config;
    return server;
  };
  server.listen = function(port) {
    callbackOnListen(givenConfig, port);
  };
  return server;
};

describe('Servinator', function() {
  afterEach(function() { 
    Object.keys(require.cache).forEach(function(key) {
      delete require.cache[key];
    });
  });
  it('should start attempt to create a server and begin listening', 
  function(done) {
    var mockserver = createMockServer(function(cfg, port) {
      assert(port == 1234);
      assert(cfg.port == port);
      assert(cfg.wizzwaps == 'zangvaums');
      process.argv.pop();
      process.argv.pop();
      done();
    })
    process.argv.push('--config', __dirname + '/test-config.json');
    require('../')(mockserver);
  });
  it('should read alternate config names from argv', 
  function(done) {
    var mockserver = createMockServer(function(cfg, port) {
      assert(port == 1234);
      assert(cfg.port == port);
      assert(cfg.wizzwaps == 'zangvaums');
      process.argv.pop();
      process.argv.pop();
      done();
    })
    process.argv.push('--hoegelvaaps', __dirname + '/test-config.json');
    require('../')(mockserver, 'hoegelvaaps');
  });
  it('should read alternate config names from env', 
  function(done) {
    var mockserver = createMockServer(function(cfg, port) {
      assert(port == 1234);
      assert(cfg.port == port);
      assert(cfg.wizzwaps == 'zangvaums');
      done();
    })
    process.env["WOBBLY_GOBBLES"] = __dirname + "/test-config.json";
    require('../')(mockserver, 'wobbygobbles', 'WOBBLY_GOBBLES');
  });
});
