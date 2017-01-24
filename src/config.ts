var env = require('../src/environment')

var config = {
    mongoURI: {
            development: env.development.MONGO_URI,
            test: env.test.MONGO_URI
        }
    };

export = config;