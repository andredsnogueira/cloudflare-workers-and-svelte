import { ContactField, Unit } from '.'

export class Option {
  id: string
  isDefault: boolean
  name: string
  requiredContactFields: ContactField[]
  units: Unit[]

  constructor(
    id: string,
    isDefault: boolean,
    name: string,
    requiredContactFields: ContactField[],
    units: Unit[],
  ) {
    this.id = id
    this.isDefault = isDefault
    this.name = name
    this.requiredContactFields = requiredContactFields
    this.units = units
  }
}
