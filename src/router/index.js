import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../page/Hello';
import MdsTest from '../components/mds-graph';
import DoughnutChartTest from '../components/doughnut-chart';
import BarChart from '../components/bar-chart';
import MainPageTest from '../page/main-page-test';
import D3Test1 from '../components/practice/d3-test1';

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
      path: '/mds-graph-test',
      name: MdsTest.name,
      component: MdsTest
    },
    {
      path: '/doughnut-chart-test',
      name: DoughnutChartTest.name,
      component: DoughnutChartTest
    },
    {
      path: '/bar-chart-test',
      name: BarChart.name,
      component: BarChart
    },
    {
      path: '/main-page-test',
      name: MainPageTest.name,
      component: MainPageTest
    },
    {
      path: '/d3-test',
      name: D3Test1.name,
      component: D3Test1
    }
  ]
});
