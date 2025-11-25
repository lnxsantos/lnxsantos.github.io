export default {
    plugins: {
        'postcss-preset-env': {
            stage: 2,
            features: {
                'nesting-rules': true,
            },
        },
        cssnano: {
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
            }],
        },
    },
};

