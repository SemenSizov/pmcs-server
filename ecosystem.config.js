module.exports = {
    apps: [
        {
            name: 'pmcs-server',
            script: './dist/index.js', // або main.js
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
