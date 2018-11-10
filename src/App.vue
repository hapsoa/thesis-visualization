<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import * as d3 from 'd3';
import _ from 'lodash';

import { store } from './vuex/store';

Vue.prototype.$d3 = d3;
// eslint-disable-next-line no-underscore-dangle
Vue.prototype.$_ = _;

export default {
  name: 'App',
  store,
  methods: {}
};
</script>

<style lang="sass">
*
  box-sizing: border-box
body
  margin: 0
  padding: 0
</style>
