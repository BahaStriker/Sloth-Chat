import { LocalStorage } from 'quasar';

const token = LocalStorage.getItem("token");

const guest = (to, from, next) => {
  if (!token) {
      return next();
  } else {
      return next("/");
  }
};
const auth = (to, from, next) => {
  if (token) {
      return next();
  } else {
      return next("/login");
  }
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', beforeEnter: auth, component: () => import('pages/PageStaff.vue') },
      { path: '/chat/:id', beforeEnter: auth, component: () => import('pages/PageChat.vue') },
      { path: '/login', beforeEnter: guest, component: () => import('pages/PageAuth.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
