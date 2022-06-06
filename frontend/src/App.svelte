<script lang="ts">
  import { Route, Router } from 'svelte-navigator';
  import ContactForm from './lib/pages/ContactForm.svelte';
  import Index from './lib/pages/Index.svelte';
  import ProductInfo from './lib/pages/ProductInfo.svelte';
  import Success from './lib/pages/Success.svelte';
</script>

<Router>
  <main>
    <Route path="/" component={Index} />
    <Route path="/products/:id" let:params>
      <ProductInfo id={params.id} />
    </Route>
    <Route path="/contact-form" component={ContactForm} />
    <Route path="/success" component={Success} />
  </main>
</Router>
