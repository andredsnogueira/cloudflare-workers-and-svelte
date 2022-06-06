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
        'VIP',
        [ContactField.fullName],
        [
          new Unit(UnitID.Adult, 'Adult Unit', [
            new Pricing('EUR', 2, 10000),
            new Pricing('USD', 2, 11000),
          ]),
          new Unit(UnitID.Child, 'Child Unit', [
            new Pricing('EUR', 2, 5000),
            new Pricing('USD', 2, 6000),
          ]),
        ],
      ),
      new Option(
        '7dac9236-7258-4cb5-b07d-249dd0171ac4',
        false,
        'Non-VIP',
        [ContactField.fullName],
        [
          new Unit(UnitID.Adult, 'Adult Unit', [
            new Pricing('EUR', 2, 250),
            new Pricing('USD', 2, 260),
          ]),
          new Unit(UnitID.Infant, 'Child Unit', [
            new Pricing('EUR', 2, 200),
            new Pricing('USD', 2, 210),
          ]),
        ],
      ),
    ],
    'EUR',
    ['EUR', 'USD'],
  ),
  new Product(
    '722c3d01-7dcf-4ac4-b937-c9b99b5174d0',
    'Product 2',
    [
      new Option(
        '5dcfb93c-6cde-4bc0-a98d-00a9b9db5d57',
        true,
        'VIP',
        [ContactField.fullName, ContactField.emailAddress],
        [
          new Unit(UnitID.Adult, 'Adult', [
            new Pricing('EUR', 2, 10000),
            new Pricing('USD', 2, 11000),
          ]),
          new Unit(UnitID.Infant, 'Infant', [
            new Pricing('EUR', 2, 5000),
            new Pricing('USD', 2, 6000),
          ]),
        ],
      ),
      new Option(
        '0ab816bf-7ebf-4b2e-8ac0-3971c34ba58b',
        false,
        'Non-VIP',
        [ContactField.fullName, ContactField.emailAddress],
        [
          new Unit(UnitID.Adult, 'Adult', [
            new Pricing('EUR', 2, 4000),
            new Pricing('USD', 2, 5000),
          ]),
          new Unit(UnitID.Infant, 'Infant', [
            new Pricing('EUR', 2, 2000),
            new Pricing('USD', 2, 3000),
          ]),
        ],
      ),
    ],
    'EUR',
    ['EUR', 'USD'],
  ),
]
