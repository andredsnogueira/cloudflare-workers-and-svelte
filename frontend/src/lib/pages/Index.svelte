<script lang="ts">
  import Spinner from '../components/Spinner.svelte';
  import type { SimplifiedProductDTO } from '../types';

  const fetchProducts = async (): Promise<SimplifiedProductDTO[]> => {
    const response = await fetch('http://localhost:8787/products');
    const products = await response.json();

    return products;
  };
</script>

<main>
  <div class="bg-white">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Products</h2>
      {#await fetchProducts()}
        <Spinner />
      {:then products}
        <div
          class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          {#each products as product}
            <a href="/products/{product.id}" class="group">
              <div
                class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
              >
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  alt="test"
                  class="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 class="mt-4 text-sm text-gray-700">
                {product.name}
              </h3>
              <p class="mt-1 text-lg font-medium text-gray-900">
                Starts at {product.currency}
                {product.startingPrice}
              </p>
            </a>
          {/each}
        </div>
      {:catch}
        <p>Error!</p>
      {/await}
    </div>
  </div>
</main>
