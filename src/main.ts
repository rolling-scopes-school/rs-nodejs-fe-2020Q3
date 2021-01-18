import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from '@/persistence/network';

router.beforeEach(async (to, from, next) => {
  const hasAccess = ['Register', 'Login', 'Logout'].includes(String(to.name)) ||
    auth.token;

  if (hasAccess) {
    next();
  }

  next({ name: 'Login' });
});

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');

