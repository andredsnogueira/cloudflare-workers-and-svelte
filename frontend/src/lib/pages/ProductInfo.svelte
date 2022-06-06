<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { get } from 'svelte/store';
  import Spinner from '../components/Spinner.svelte';
  import UnitOption from '../components/UnitOption.svelte';
  import {
    availableCurrencies,
    booking as bookingStore,
    defaultCurrency,
    product as productStore,
  } from '../stores';
  import type { Booking, Option, Product, Unit } from '../types';

  export let id: string;
  let optionSelected: Option | null = null;
  let currencySelected: string | null = null;
  let totalProductBookingPrice: number = 0;

  bookingStore.subscribe((booking: Booking) => {
    if (booking) {
      totalProductBookingPrice =
        booking.pricing.price / 10 ** booking.pricing.currencyPrecision;
    }
  });

  const fetchProduct = async (id: string): Promise<Product> => {
    const response = await fetch(`http://localhost:8787/products/${id}`);
    const product: Product = await response.json();

    optionSelected = product.options.find((option) => option.isDefault);
    currencySelected = product.defaultCurrency;
    defaultCurrency.set(product.defaultCurrency);
    availableCurrencies.set(product.availableCurrencies);
    productStore.set(product);

    return product;
  };

  const handleOptionChange = (option: any) => {
    optionSelected = option;
    clearProductBooking();
  };

  const handleCurrencyChange = () => {
    defaultCurrency.set(currencySelected);
    clearProductBooking();
  };

  const clearProductBooking = () => {
    totalProductBookingPrice = 0.0;
    bookingStore.update((_) => null);
  };

  const handleUnitQuantityChange = (unit: Unit, quantity: number) => {
    if (quantity <= 0) {
      clearProductBooking();
      return;
    }

    const tmpBooking = get(bookingStore);

    if (tmpBooking) {
      const unitItem = tmpBooking.unitItems.find(
        (unitItem) => unitItem.unitId === unit.id
      );

      if (unitItem) {
        unitItem.quantity = quantity;
      } else {
        tmpBooking.unitItems.push({
          unitId: unit.id,
          quantity: quantity,
          price: unit.pricing.find(
            (pricing) => pricing.currency === currencySelected
          ).price,
        });
      }

      tmpBooking.pricing.price = recalculateBookingTotalPrice(tmpBooking);

      bookingStore.update((bs) => bs);
    } else {
      const tmpPricing = unit.pricing.find(
        (pricing) => pricing.currency === currencySelected
      );

      const newBooking = {
        productId: id,
        optionId: optionSelected.id,
        pricing: tmpPricing,
        unitItems: [
          {
            unitId: unit.id,
            quantity: quantity,
            price: tmpPricing.price,
          },
        ],
        contact: {},
      } as Booking;

      newBooking.pricing.price = recalculateBookingTotalPrice(newBooking);

      bookingStore.set(newBooking);
    }
  };

  const recalculateBookingTotalPrice = (booking: Booking): number =>
    booking.unitItems.reduce(
      (acc, unitItem) => acc + unitItem.price * unitItem.quantity,
      0
    );
</script>

<div
  class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
>
  {#await fetchProduct(id)}
    <Spinner />
  {:then product}
    <div class="col-span-full w-1/2 sm:w-1/4 mb-8">
      <label for="location" class="block text-sm font-medium text-gray-700"
        >Default currency</label
      >
      <select
        bind:value={currencySelected}
        on:change={handleCurrencyChange}
        id="currency"
        name="currency"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {#each get(availableCurrencies) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>
    <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
      <h1
        class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
      >
        {product.name}
      </h1>
    </div>
    <div class="mt-4 lg:mt-0 lg:row-span-3">
      <h2 class="sr-only">Product information</h2>
      <p class="text-3xl text-gray-900">
        {currencySelected}
        {totalProductBookingPrice.toFixed(2)}
      </p>

      <div class="mt-8">
        <h2 class="text-sm font-medium text-gray-900">Options</h2>
        <fieldset class="mt-2">
          <legend class="sr-only">Choose a memory option</legend>
          <div class="grid grid-cols-3 gap-3 ">
            {#each product.options as option}
              <label
                on:click={() => handleOptionChange(option)}
                class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none {option ===
                optionSelected
                  ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                  : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'}"
              >
                <input
                  type="radio"
                  name="option"
                  value={option.name}
                  class="sr-only"
                />
                <span>{option.name}</span>
              </label>
            {/each}
          </div>
        </fieldset>
      </div>
      <div class="mt-8">
        <h2 class="text-sm font-medium text-gray-900 mb-2">Select a unit</h2>
        <div class="lg:mt-0 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          {#each optionSelected.units as unit}
            {#key [currencySelected, optionSelected]}
              <UnitOption
                {unit}
                currency={currencySelected}
                onChange={handleUnitQuantityChange}
              />
            {/key}
          {/each}
        </div>
      </div>
      <div class="mt-8">
        <Link to="/contact-form">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Book now
          </button>
        </Link>
      </div>
    </div>
    <div
      class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"
    >
      <div>
        <h3 class="sr-only">Description</h3>
        <div class="space-y-6">
          <p class="text-base text-gray-900">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            reprehenderit deserunt non, alias vitae minima sit aperiam aliquam,
            neque, iure distinctio tempora. Fugit inventore dolorem qui quis,
            corrupti cum sed!
          </p>
        </div>
      </div>
    </div>
  {:catch}
    <p>Error!</p>
  {/await}
</div>
