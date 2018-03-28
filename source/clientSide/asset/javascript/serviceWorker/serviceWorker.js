{% // if(Application.config.deployment == 'production') { %} 

self; // javascript keyword - referes to the worker. 
self.addEventListener('install', (event) => {
  event.waitUntil( // keep worker alive
    // cache api - static assets cache
    new Promise(resolve => resolve()).then(() => {
      return self.skipWaiting() // let new service worker take over immediately, without a reload or user interaction.
    })
  )
})
self.addEventListener('activate', (event) => {
  // indexdb cache - write indexDB cache for dynamic content 
  event.waitUntil(
    new Promise(resolve => resolve()).then(() => {
      console.log('Deleting old caches')
      return; 
    })    
  )
  return self.clients.claim() // Update all of the clients. i.e. all of the service workerers catch up with the current catch. 
})
self.addEventListener('message', (event) => { // communicate between service worker and main code in windowed context using 'push' message command.
  console.log(event)
})
self.addEventListener('fetch', (event) => {
  // event.respondWith()
  // console.log(event)
})
self.addEventListener('sync', (event) => { // schedualed or one time sync
  switch (event.tag) {
    case 'backgroundSyncTag':
    default:
      console.log('One time synchronization in the background.')
      event.waitUntil(new Promise(resolve => resolve())) // keep service worker working till promise resolves
    break;
  }
})


{% // } else { %} 
  // console.info('☕ Service worker disabled for development, will be generated at build time.')
{% // } %}
