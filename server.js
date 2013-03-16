var fs = require('fs'),
    argv = require('optimist').argv;

module.exports = function servinator(server, configArgName, envVarName) {
  configArgName = configArgName || 'config';
  envVarName = envVarName || 'CONFIG_FILE';

  var configFile = argv[configArgName] || process.env[envVarName];

  if (!configFile) {
    throw new Error("No configuration specified! Use the --" + configArgName +
                    " flag or the " + envVarName + " environment variable to " +
                    " specify a configuration file");
  } else if (!fs.existsSync(configFile)) {
    throw new Error("Transcoder config file '" + configFile + "' " +
                    "doesn't actually exist. That's not very nice. Please give " +
                    "me a config which does exist.");
  }

  var config = JSON.parse(fs.readFileSync(configFile));
  if (server.length == 2) {
    server(config, function(err, app) {
      if (err) throw err;
      app.listen(config.port);
    });
  } else {
    return server(config).listen(config.port);
  }
};

