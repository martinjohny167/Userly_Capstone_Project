const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Add proxies for API calls if needed
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  
  // For development only - simulate SPA routing
  app.use((req, res, next) => {
    // Skip for API calls and static assets
    if (req.path.startsWith('/api') || 
        req.path.startsWith('/static') || 
        req.path.includes('.')) {
      return next();
    }
    
    // Forward all other paths to index.html
    console.log(`Forwarding ${req.path} to index.html`);
    next();
  });
}; 