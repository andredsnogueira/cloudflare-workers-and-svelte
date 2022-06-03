import { ContactField, Option, Pricing, Product, Unit, UnitID } from '../models'

export const findProduct = (id: string): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const findAllProducts = (): Product[] => {
  return products
}

const products = [
  new Product(
    'c33ae613-bcb4-48a2-9ee9-ed4e787b8f8a',
    'Product 1',
    [
      new Option(
        '611b8f54-0c7e-4eec-9e68-4714a8311766',
        true,
        'Option 1',
        [ContactField.fullName, ContactField.emailAddress],
        [
          new Unit(UnitID.Adult, 'Adult Unit 1', [
            new Pricing('EUR', 2, 10000),
            new Pricing('USD', 2, 11000),
          ]),
          new Unit(UnitID.Child, 'Child Unit 1', [
            new Pricing('EUR', 2, 5000),
            new Pricing('USD', 2, 6000),
          ]),
        ],
      ),
      new Option(
        '7dac9236-7258-4cb5-b07d-249dd0171ac4',
        false,
        'Option 2',
        [ContactField.fullName, ContactField.emailAddress],
        [
          new Unit(UnitID.Adult, 'Adult Unit 1', [
            new Pricing('EUR', 2, 250),
            new Pricing('USD', 2, 260),
          ]),
          new Unit(UnitID.Infant, 'Infant Unit 1', [
            new Pricing('EUR', 2, 200),
            new Pricing('USD', 2, 210),
          ]),
        ],
      ),
    ],
    'EUR',
    ['EUR', 'USD'],
  ),
]
