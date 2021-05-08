module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if(!config.module.rules) config.module.rules = [];
        config.module.rules.push({
            test: /\.xml/,
            type: 'asset/source'
        });
        return config;
    },
    future: {
        webpack5: true
    }
}