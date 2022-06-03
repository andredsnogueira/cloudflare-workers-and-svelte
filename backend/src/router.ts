import { Request, Router } from 'itty-router'
import { getProductById, getProducts } from './routes/products'

const router = Router<Request>()

router.get('/products', getProducts)
router.get('/products/:id', getProductById)

router.all(
  '*',
  () =>
    new Response('Not found.', {
      status: 404,
      headers: { 'content-type': 'application/json;charset=UTF-8' },
    }),
)

export default router
