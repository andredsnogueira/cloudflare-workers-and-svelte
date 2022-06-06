import { get, writable } from 'svelte/store';
import type { Booking, Product } from '../types';

export const availableCurrencies = writable<string[]>([]);
export const defaultCurrency = writable<string>('EUR');

export const product = writable<Product>(
  localStorage.getItem('product')
    ? JSON.parse(localStorage.getItem('product'))
    : null
);
product.subscribe((product) => {
  if (product) {
    localStorage.setItem('product', JSON.stringify(product));
  } else {
    localStorage.removeItem('product');
  }
});

export const booking = writable<Booking>(
  localStorage.getItem('booking')
    ? JSON.parse(localStorage.getItem('booking'))
    : null
);

booking.subscribe((booking) => {
  if (booking && booking.productId === get(product).id) {
    localStorage.setItem('booking', JSON.stringify(booking));
  } else {
    localStorage.removeItem('booking');
  }
});
