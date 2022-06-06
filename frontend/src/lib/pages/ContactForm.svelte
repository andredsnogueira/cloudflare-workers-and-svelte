<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import { get } from 'svelte/store';
  import { ContactField } from '../enums';
  import { booking as bookingStore, product as productStore } from '../stores';

  const product = get(productStore);
  const booking = get(bookingStore);

  const requiredFields = product.options.find(
    (option) => option.id === booking.optionId
  )?.requiredContactFields;

  const fullNameRequired = requiredFields.includes(ContactField.fullName);
  const emailRequired = requiredFields.includes(ContactField.emailAddress);
  const phoneNumberRequired = requiredFields.includes(ContactField.phoneNumber);

  const handleOnSubmit = () => {
    navigate('/success');
  };
</script>

<div class="bg-white">
  <div
    class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
  >
    {#if get(productStore) && get(bookingStore)}
      <form
        class="flex flex-col space-y-8"
        on:submit|preventDefault={handleOnSubmit}
      >
        <div>
          <label
            for="full-name"
            class="block text-sm font-medium text-gray-700"
          >
            Full name
            {#if fullNameRequired}
              <span class="text-indigo-500">required</span>
            {/if}
          </label>
          <input
            type="text"
            name="full-name"
            id="full-name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required={fullNameRequired}
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
            {#if emailRequired}
              <span class="text-indigo-500">required</span>
            {/if}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required={emailRequired}
          />
        </div>

        <div>
          <label
            for="phone-number"
            class="block text-sm font-medium text-gray-700"
          >
            Phone Number
            {#if phoneNumberRequired}
              <span class="text-indigo-500">required</span>
            {/if}
          </label>
          <input
            type="tel"
            name="phone-number"
            id="phone-number"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required={phoneNumberRequired}
          />
        </div>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Confirm Purchase
        </button>
      </form>
    {/if}
  </div>
</div>
