module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/api': {
                target: 'http://localhost:4000/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        before: app => { }
    }
}
