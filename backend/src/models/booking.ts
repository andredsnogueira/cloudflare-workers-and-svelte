import { Contact, Pricing, UnitItem } from '.'

export class Booking {
  id: string
  productId: string
  optionId: string
  pricing: Pricing
  unitItems: UnitItem[]
  contact: Contact

  constructor(
    id: string,
    productId: string,
    optionId: string,
    pricing: Pricing,
    unitItems: UnitItem[],
    contact: Contact,
  ) {
    this.id = id
    this.productId = productId
    this.optionId = optionId
    this.pricing = pricing
    this.unitItems = unitItems
    this.contact = contact
  }
}
