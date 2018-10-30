<template lang="pug">
  .page-root
    header-component
    .overall-content-box
      section
        circle-test2
      aside {{clickedAuthors}}
</template>

<script>
import headerComponent from '../components/thesis-test1/header-component';
import circleTest2 from '../components/thesis-test1/circle-test2-component';

export default {
  name: 'thesis-test1',
  components: { headerComponent, circleTest2 },
  computed: {
    clickedAuthors() {
      return this.$store.getters.getClickedAuthors;
    }
  }
};
</script>

<style scoped lang="sass">
$header-height: 80px

.page-root
  header
    width: 100%
    height: $header-height
    border-bottom: 1px solid #ccc
  .overall-content-box
    display: flex
    width: 100%
    height: calc(100vh - #{$header-height})
    > section
      flex: 1
      text-align: center
    > aside
      width: 300px
      border-left: 1px solid #ccc
</style>
