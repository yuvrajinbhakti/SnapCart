const apiBaseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://snap-cart-kap9.vercel.app/api'
  : '/api';

export { apiBaseUrl }; 