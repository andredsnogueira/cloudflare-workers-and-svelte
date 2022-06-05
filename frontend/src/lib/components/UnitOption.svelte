<script lang="ts">
  import type { Unit } from '../types';

  export let unit: Unit;
  export let onChange: (unit: Unit, counter: number) => void;
  export let currency: string;

  const pricing = unit.pricing.find((pricing) => pricing.currency === currency);
  const priceLabel = `${pricing.currency} ${
    pricing.price / 10 ** pricing.currencyPrecision
  }`;

  const handleUnitCountChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const counter = parseInt(target.value);

    if (counter >= 0) onChange(unit, counter);
  };
</script>

<div class="relative bg-white border rounded-lg shadow-sm p-4 flex">
  <div class="flex-1 flex">
    <div class="flex flex-col">
      <span
        id="project-type-0-label"
        class="block text-sm font-medium text-gray-900"
      >
        {unit.name}
      </span>
      <span
        id="project-type-0-description-0"
        class="mt-1 flex items-center text-sm text-gray-500"
      >
        {priceLabel}
      </span>
      <input
        on:change={handleUnitCountChange}
        class="w-full mt-2"
        type="number"
        name="counter"
        id="counter"
        value="0"
      />
    </div>
  </div>
</div>
