var fs = require('fs'),
    argv = require('optimist').argv;

var transcoderConfigFile = argv.transcoder || process.env.LAMBIC_TRANSCODER;

if (!transcoderConfigFile) {
  throw new Error("No transcoder specified! Use the --transcoder flag or " +
                  "the LAMBIC_TRANSCODER environment variable to specify a " +
                  "configuration file");
} else if (!fs.existsSync(transcoderConfigFile)) {
  throw new Error("Transcoder config file '" + transcoderConfigFile + "' " +
                  "doesn't actually exist. That's not very nice. Please give " +
                  "me a config which does exist.");
}

var transcoderConfig = JSON.parse(fs.readFileSync(transcoderConfigFile));
require('./')(transcoderConfig).listen(transcoderConfig.port);

