// Determine the base URL for API calls
const apiBaseUrl = import.meta.env.PROD 
  ? 'https://snap-cart-kap9.vercel.app/api'
  : '/api';

console.log('API Base URL:', apiBaseUrl);

export { apiBaseUrl }; 