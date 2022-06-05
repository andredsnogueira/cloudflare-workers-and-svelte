<script lang="ts">
  import { Route, Router } from 'svelte-navigator';
  import Index from './lib/pages/Index.svelte';
  import ProductInfo from './lib/pages/ProductInfo.svelte';
</script>

<Router>
  <main>
    <Route path="/" component={Index} />
    <Route path="/products/:id" let:params>
      <ProductInfo id={params.id} />
    </Route>
  </main>
</Router>
