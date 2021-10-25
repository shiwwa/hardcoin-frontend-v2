module.exports = {
    apps : [
        {
            name: "gulp",
            script: "npx gulp watch",
            env: {
                "HOST": "0.0.0.0",
                "PORT": 3000,
                "NODE_ENV": "production",
            }
        }
    ]
}
