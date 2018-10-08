import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../page/Hello';
import MdsTest from '../page/mds-test';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/thesis-visualization',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/mds-test',
      name: MdsTest.name,
      component: MdsTest
    }
  ]
});
