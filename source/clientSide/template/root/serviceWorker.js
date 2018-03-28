/* Service Worker */
// TODO: integrate - https://github.com/GoogleChromeLabs/sw-toolbox & https://developers.google.com/web/tools/workbox/ 
self; // javascript keyword - referes to the window.self 
const App = self.App

;(async () => {

    // service worker not supported.
    if(!navigator.serviceWorker) { console.warn(`☕ Service Worker not supported.`); return }
    // Load pre-caching Service Worker
    self.addEventListener('load', () => { // all page resources finished loading.
        let serviceWorkerPath = `${self.location.origin}/serviceWorker.js$` // root protocol, hostname, & port number + service worker name
        let serviceWorkerScope = `${self.location.origin}` // OR `${App.config.PROTOCOL}${App.config.HOST}`
        navigator.serviceWorker
            .register(serviceWorkerPath, { scope:  serviceWorkerScope }) // service worker caches its control file, and will only update when it changes.
            .then(registration => {
                console.info(`☕ Service Worker - registered with scope: ${registration.scope}`)
                /* Push notification - 'registration' object is used for enabling push notification among other things. */
            })
        navigator.serviceWorker 
            .ready.then(swRegistration => {
                return swRegistration.sync.register('backgroundSyncTag') // Later request a one-off sync or schedualed.
            })
    })

})() // async