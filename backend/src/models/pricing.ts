export class Pricing {
  currency: string
  currencyPrecision: number
  price: number

  constructor(currency: string, currencyPrecision: number, price: number) {
    this.currency = currency
    this.currencyPrecision = currencyPrecision
    this.price = price
  }
}
