<script lang="ts">
  import { get } from 'svelte/store';
  import { booking as bookingStore, product as productStore } from '../stores';

  console.log(get(bookingStore));

  bookingStore.set(null);
  productStore.set(null);
</script>

<div>Success</div>
