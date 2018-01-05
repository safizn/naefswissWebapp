// This file would be required in Redbird reverseProxy. 
// USAGE: 

module.exports = function reverseProxy(proxy) {

    let email = process.env.EMAIL
    let domain = 'naefswiss.webapp.run'
    
    proxy.register(
        domain, 
        'http://naefswisswebapp_nodejs:80', {
        ssl: {
                letsencrypt: {
                    email: email, // Domain owner/admin email
                    production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
                }
            }
        }
    );
    proxy.register(
        'api.' + domain, 
        'http://naefswisswebapp_nodejs:8082', 
        {
            ssl: {
                letsencrypt: {
                    email: email, // Domain owner/admin email
                    production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
                }
            }
        }
    );
    proxy.register(
        'cdn.' + domain, 
        'http://naefswisswebapp_nodejs:8081', 
        {
            ssl: {
                letsencrypt: {
                    email: email, // Domain owner/admin email
                    production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
                }
            }
        }
    );
    proxy.register(
        'oauth.' + domain, 
        'http://naefswisswebapp_nodejs:8088', 
        {
            ssl: {
                letsencrypt: {
                    email: email, // Domain owner/admin email
                    production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
                }
            }
        }
    );
    
    proxy.register(
        'rethinkdb.' + domain, 
        'http://naefswisswebapp_rethinkdb:8080'
    );

}
