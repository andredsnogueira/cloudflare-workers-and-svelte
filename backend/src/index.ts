import router from './router'

const errorHandler = () => new Response('Server Error.', { status: 500 })

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle(event.request).catch(errorHandler))
})
