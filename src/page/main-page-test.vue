<template lang="pug">
  #app
    .search-zone
      input(type="text")
    .view-zone
      .main-view
        MdsGraph
      .sub-view
        DoughnutChart
        BarChart

</template>

<script>
import MdsGraph from '../components/mds-graph';
import DoughnutChart from '../components/doughnut-chart';
import BarChart from '../components/bar-chart';

export default {
  name: 'main-page-test',
  components: {
    MdsGraph, DoughnutChart, BarChart
  }
};
</script>

<style scoped lang="sass">
  .search-zone
    width: 100%
    height: 40px
    border-bottom: 1px solid #aaa
    text-align: center
    align-items: center
    > input
      width: 200px
  .view-zone
    display: flex
    /*.main-view*/
    /*.sub-view*/
</style>
