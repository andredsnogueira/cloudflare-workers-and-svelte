<script lang="ts">
  import { Route, Router } from 'svelte-navigator';
  import ContactForm from './lib/pages/ContactForm.svelte';
  import Index from './lib/pages/Index.svelte';
  import ProductInfo from './lib/pages/ProductInfo.svelte';
  import Success from './lib/pages/Success.svelte';
</script>

<Router>
  <main>
    <Route path="/">
      <Index />
    </Route>
    <Route path="/products/:id" let:params primary={false}>
      <ProductInfo id={params.id} />
    </Route>
    <Route path="/contact-form">
      <ContactForm />
    </Route>
    <Route path="/success">
      <Success />
    </Route>
  </main>
</Router>
