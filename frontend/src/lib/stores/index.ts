import { writable } from 'svelte/store';
import type { Booking } from '../types';

export const availableCurrencies = writable<string[]>([]);
export const defaultCurrency = writable<string>('EUR');

export const bookings = writable<Booking[]>([]);
