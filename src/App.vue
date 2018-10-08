<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { store } from './vuex/store';

export default {
  name: 'App',
  store,
  methods: {}
};
</script>

<style>

</style>
