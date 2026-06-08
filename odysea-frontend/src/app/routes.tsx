export const routes = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  deliveries: '/entregas',
  deliveryDetails: (id: number | string) => `/entregas/${id}`,
  security: '/seguranca',
};
