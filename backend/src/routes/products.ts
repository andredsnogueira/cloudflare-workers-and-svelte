import { Request } from 'itty-router'
import { findAllProducts, findProduct } from '../db'
import { SimplifiedProductDTO } from '../dto/simplifiedProductDTO'

export const getProducts = (): Response => {
  //TODO: Query params for desired currency?
  const desiredCurrency = 'EUR'
  const products = findAllProducts()

  const productsDTO: SimplifiedProductDTO[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    startingPrice: product.cheapestProductOption(desiredCurrency),
    currency: desiredCurrency,
  }))

  return new Response(JSON.stringify(productsDTO), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  })
}

export const getProductById = (request: Request): Response => {
  const id = request.params?.id as string

  const product = findProduct(id)

  if (!product) {
    return new Response('Not found.', {
      status: 404,
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
    })
  }

  return new Response(JSON.stringify(product), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  })
}
