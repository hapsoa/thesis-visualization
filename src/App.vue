<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import * as d3 from 'd3';
import { store } from './vuex/store';

Vue.prototype.$d3 = d3;

export default {
  name: 'App',
  store,
  methods: {}
};
</script>

<style>

</style>
