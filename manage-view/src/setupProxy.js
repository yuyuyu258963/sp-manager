const { createProxyMiddleware } = require('http-proxy-middleware')
 
module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://121.4.249.181:5590',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  }))
}