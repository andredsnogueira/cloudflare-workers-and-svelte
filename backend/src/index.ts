import router from './router'

const errorHandler = () =>
  new Response('Server Error.', {
    status: 500,
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
  })

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle(event.request).catch(errorHandler))
})
