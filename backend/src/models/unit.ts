import { Pricing, UnitID } from '.'

export class Unit {
  id: UnitID
  name: string
  pricing: Pricing[]

  constructor(id: UnitID, name: string, pricing: Pricing[]) {
    this.id = id
    this.name = name
    this.pricing = pricing
  }
}
