import { Option } from '.'

export class Product {
  id: string
  name: string
  options: Option[]
  defaultCurrency: string
  availableCurrencies: string[]

  constructor(
    id: string,
    name: string,
    options: Option[],
    defaultCurrency: string,
    availableCurrencies: string[],
  ) {
    this.id = id
    this.name = name
    this.options = options
    this.defaultCurrency = defaultCurrency
    this.availableCurrencies = availableCurrencies
  }

  cheapestProductOption(currency: string): number {
    return Math.min(
      ...this.options
        .flatMap((option) =>
          option.units.flatMap((unit) =>
            unit.pricing
              .filter((pricing) => pricing.currency === currency)
              .map((pricing) => pricing),
          ),
        )
        .map((pricing) => pricing.price),
    )
  }
}
