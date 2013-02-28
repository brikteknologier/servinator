# Servinator

Reads a config file and starts a server with it.

## function servinate(serverGenerator, configArgName, configEnvVar)

This will first attempt to read a configuration, by looking for an argument
passed to the node process, specified by `configArgName`, or an environment
variable, specified by `configEnvVar`, that contains the file name of a JSON
file containing the config.

**The configuration file that is specified \*must\* contain a `"port"` variable,
which specifies what port the server should listen on**.

For example, if `configArgName` is set to `"wizzlemubs"`, and the process was
started with `node server --wizzlemubs ~/scary/mubs.json`, the configuration
would be read from `~/scary/mubs.json`.

`configArgName` takes precedence over `configEnvVar`.

* `serverGenerator` **required** — a function which takes a single argument - 
  a configuration object - and returns an http server.
* `configArgName` *optional* - the name of the process argument which specifies
  the location of the config json file. defaults to `"config"`.
* `configEnvVar` *optional* - the name of the environment variable which
  specifies the location of the config json file. defaults to `"CONFIG_FILE"`.

## Example server.js 

```javascript
require('servinator')(require('./my_amazing_server'), 'amazement');
```

Which would be run with

```
node server --amazement ./amazing.json 
```

## License

MIT
