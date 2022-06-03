import { UnitID } from '.'

export class UnitItem {
  id: UnitID
  quantity: number
  price: number

  constructor(id: UnitID, quantity: number, price: number) {
    this.id = id
    this.quantity = quantity
    this.price = price
  }
}

export default UnitItem
