var fs = require('fs');
var argv = require('optimist').argv;

module.exports = function servinator(server, configArgName, envVarName) {
  configArgName = configArgName || 'config';
  envVarName = envVarName || 'CONFIG_FILE';

  var configFile = argv[configArgName] || process.env[envVarName];

  if (!configFile) {
    process.stderr.write(
      "No configuration specified! Use the --" + configArgName + " " +
      "flag or the " + envVarName + " environment variable to " +
      "specify a configuration file\n");
    process.exit(1);
  } else if (!fs.existsSync(configFile)) {
    process.stderr.write(
      "Config file '" + configFile + "' " +
      "doesn't actually exist. That's not very nice. Please give " +
      "me a config which does exist.\n");
    process.exit(1);
  }

  var config = JSON.parse(fs.readFileSync(configFile));
  if (config.port === undefined) {
    process.stderr.write("Configuration must have a key 'port' with a " +
      "numerical value, specifying the TCP port the server should listen on\n");
    process.exit(1);
  }

  var httpServer = new http.Server();
  if (server.length == 2) {
    server(config, function(err, app) {
      if (err) {
        process.stderr.write(err + "\n");
        process.exit(1);
      }
      httpServer.on('request', app);
      app.listen(config.port);
    });
  } else {
    httpServer.on('request', server(config));
    httpServer.listen(config.port);
  }
  return httpServer;
};

