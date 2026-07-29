export default {
  routes: [
    {
      method: 'GET',
      path: '/revalidate-frontend-cache',
      handler: 'revalidate.revalidate',
      config: {
        auth: false,
      },
    },
  ],
};
