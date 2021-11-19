import createCache from '@emotion/cache';

const getUserAddress = (user) => {
  const { address } = user;
  const { street, suite, zipcode, city } = address;
  return `${street}, ${suite}, ${city}, ${zipcode}`;
};

const createEmotionCache = () => {
  return createCache({ key: 'css' });
};

const domain = 'https://realfevr-technical-test.vercel.app';
// const domain = 'http://localhost:3000';

export { getUserAddress, createEmotionCache, domain };
