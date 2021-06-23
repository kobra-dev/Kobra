module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (!config.module.rules) config.module.rules = [];
        [/\.svg/, /\.xml/].forEach((r) => {
            config.module.rules.push({
                test: r,
                type: "asset/source"
            });
        });
        return config;
    },
    images: {
        disableStaticImages: true
    }
};
