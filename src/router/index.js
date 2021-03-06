import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../page/Hello';
import MdsTest from '../components/mds-graph';
import DoughnutChartTest from '../components/doughnut-chart';
import BarChart from '../components/bar-chart';
import MainPageTest from '../page/main-page-test';
import D3Test1 from '../components/practice/d3-test1';
import CircleTest from '../page/circle-test';
import CircleTest2 from '../page/circle-test2';
import ForceDirectedGraph from '../page/force-directed-graph';
import ThesisTest1 from '../page/thesis-test1';
import CurveTest from '../page/curve-test';
import MakingRadviz from '../page/making-radviz';
import SandglassTest from '../page/sandglass-test';

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
    },
    {
      path: '/circle-test',
      name: CircleTest.name,
      component: CircleTest
    },
    {
      path: '/circle-test2',
      name: CircleTest2.name,
      component: CircleTest2
    },
    {
      path: '/force-directed-graph',
      name: ForceDirectedGraph.name,
      component: ForceDirectedGraph
    },
    {
      path: '/thesis-test1',
      name: ThesisTest1.name,
      component: ThesisTest1
    },
    {
      path: '/curve-test',
      name: CurveTest.name,
      component: CurveTest
    },
    {
      path: '/making-radviz',
      name: MakingRadviz.name,
      component: MakingRadviz
    },
    {
      path: '/sandglass-test',
      name: SandglassTest.name,
      component: SandglassTest
    }
  ]
});
